import { useQuery } from '@tanstack/react-query'
import { useApi } from '../../../lib/hooks/useApi'
import { useEffect, useState } from 'react'

interface PhotoProps {
  indexQuestion: number
}

const Photo = (props: PhotoProps) => {
  const { getImage } = useApi()
  const [imageUrl, setImageUrl] = useState('')
  const { indexQuestion } = props
  const { data: image } = useQuery({
    queryKey: ['image', indexQuestion],
    queryFn: () => getImage(indexQuestion),
  })

  useEffect(() => {
    if (image && image instanceof Blob) {
      setImageUrl(URL.createObjectURL(image))
    }
  }, [image])

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [imageUrl])

  return (
    <img
      src={imageUrl}
      alt="photo"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  )
}

export default Photo
