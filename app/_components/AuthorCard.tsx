import React from 'react'
import getFrontmatter from './getFrontmatter'
import { copyImageToPublic, getEggspressSettings, getImageFilesRecursively } from '../utils'
import Image from 'next/image'
import Link from 'next/link'
import egg from '@/public/assets/egg.svg'


const getProfileImage =  async (imageFileName: string): Promise<string | null> => {
  const imageFiles = await getImageFilesRecursively('my_authors')
  const profileImageFiles = imageFiles.filter(file => file.name === imageFileName)

  if (profileImageFiles.length) {
    const imageFile = profileImageFiles[0]
    const source = `${imageFile.path}/${imageFile.name}`
    const imageUrl = copyImageToPublic(source, 'images/profile')
    return imageUrl
  } else {
    return ''
  }
}

const AuthorCard = async ({slug}: {slug: string | null}) => {
  const authorFrontmatter = await getFrontmatter('authors')
  const authorData = authorFrontmatter.filter(frontmatter => frontmatter.slug === slug)[0]
  const imageUrl = authorData && authorData.image ? await getProfileImage(authorData.image) : ''
  const appearanceSettings = await getEggspressSettings('appearance')
  
  if (!authorData) {
    return
  }

  return (
    <div className={`mb-16 ${appearanceSettings.colorAuthorCardTextDark ? `dark:text-${appearanceSettings.colorAuthorCardTextDark}` : 'dark:text-gray-200'} ${appearanceSettings.colorAuthorCardTextLight ? `text-${appearanceSettings.colorAuthorCardTextLight}` : 'text-gray-600'}`}>
      <Link href={`/author/${slug}`} className="mb-1 flex flex-wrap">
        {imageUrl && imageUrl.length > 0 ? (
          <div className={`${imageUrl.length ? '' : 'hidden'} lg:-ml-2 mr-3 h-11 w-11 rounded-full object-cover overflow-hidden`}>
            <Image src={imageUrl} width="56" height="56" alt={`Profile image for ${authorData.name}`}></Image>
          </div>
        ) :
          <div className="-ml-2 mr-3 h-11 w-11 p-2 rounded-full bg-gray-200 dark:bg-gray-600 duration-150">
            <Image src={egg} width="96" height="96" alt={`Profile image for ${authorData.name}`}></Image>
          </div>
        }
        <div className={`font-medium my-auto ${appearanceSettings.colorAuthorCardHeadingDark ? `dark:text-${appearanceSettings.colorAuthorCardHeadingDark}` : ''} ${appearanceSettings.colorAuthorCardHeadingLight ? `text-${appearanceSettings.colorAuthorCardHeadingLight}` : ''}`}>
          <span className={authorData.role ? '' : 'pl-2 font-semibold'}>
            {authorData.name || slug}
          </span>
          {authorData.role && (<div className="text-xs">{authorData.role}</div>)}
        </div>
      </Link>
      { authorData.description &&
        <div className="text-sm py-2 mb-1">
          {authorData.description}
        </div>
      }
      <div className="flex flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => {return (authorData['socialLink' + index] &&
          <div className={`text-sm w-1/2 md:w-full mb-4 md:mb-1 ${appearanceSettings.colorAuthorCardLinkLabelDark ? `dark:text-${appearanceSettings.colorAuthorCardLinkLabelDark}` : 'dark:text-gray-400'} ${appearanceSettings.colorAuthorCardLinkLabelLight ? `text-${appearanceSettings.colorAuthorCardLinkLabelLight}` : 'text-gray-500'}`} key={`social-link-${authorData.slug}-${index}`}>
            <span>
              {authorData['socialPlatform' + index] && authorData['socialHandle' + index] ? `${authorData['socialPlatform' + index]}: ` : 'Social: '}
            </span>
            <a href={authorData['socialLink' + index]} target="_blank" rel="nofollow noopener" className={`underline-animated ${appearanceSettings.colorAuthorCardLinkTextDark ? `dark:text-${appearanceSettings.colorAuthorCardLinkTextDark}` : 'dark:text-gray-400'} ${appearanceSettings.colorAuthorCardLinkTextLight ? `text-${appearanceSettings.colorAuthorCardLinkTextLight}` : 'text-gray-700'} ${appearanceSettings.colorAuthorCardLinkTextHoverDark ? `dark:hover:text-${appearanceSettings.colorAuthorCardLinkTextHoverDark}` : 'dark:hover:text-gray-300'} ${appearanceSettings.colorAuthorCardLinkTextHoverLight ? `hover:text-${appearanceSettings.colorAuthorCardLinkTextHoverLight}` : 'hover:text-gray-800'}`}>
              {authorData['socialPlatform' + index] && authorData['socialHandle' + index] ? `@${authorData['socialHandle' + index].replace('@', '')}` : authorData['socialPlatform' + index]}
              {(!authorData['socialPlatform' + index] || !authorData['socialPlatform' + index].length) ? authorData['socialLink' + index].slice(authorData['socialLink' + index].lastIndexOf('://')+3) : '' }
            </a>
          </div>
        )})}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => {return (authorData['websiteLink' + index] &&
          <div className={`text-sm w-1/2 md:w-full mb-4 md:mb-1 ${appearanceSettings.colorAuthorCardLinkLabelDark ? `dark:text-${appearanceSettings.colorAuthorCardLinkLabelDark}` : 'dark:text-gray-400'} ${appearanceSettings.colorAuthorCardLinkLabelLight ? `text-${appearanceSettings.colorAuthorCardLinkLabelLight}` : 'text-gray-500'}`} key={`website-link-${authorData.slug}-${index}`}>
            <span className="pr-1">
              {authorData['websiteLabel' + index] || 'Website'}:
            </span>
            <a href={authorData['websiteLink' + index]} target="_blank" rel="" className={`underline-animated ${appearanceSettings.colorAuthorCardLinkTextDark ? `dark:text-${appearanceSettings.colorAuthorCardLinkTextDark}` : 'dark:text-gray-400'} ${appearanceSettings.colorAuthorCardLinkTextLight ? `text-${appearanceSettings.colorAuthorCardLinkTextLight}` : 'text-gray-700'} ${appearanceSettings.colorAuthorCardLinkTextHoverDark ? `dark:hover:text-${appearanceSettings.colorAuthorCardLinkTextHoverDark}` : 'dark:hover:text-gray-300'} ${appearanceSettings.colorAuthorCardLinkTextHoverLight ? `hover:text-${appearanceSettings.colorAuthorCardLinkTextHoverLight}` : 'hover:text-gray-800'}`}>
              {authorData['websiteName' + index] ? authorData['websiteName' + index] : authorData['websiteLink' + index].slice(authorData['websiteLink' + index].lastIndexOf('://')+3)}
            </a>
          </div>
        )})}
      </div>
    </div>
  )
}

export default AuthorCard