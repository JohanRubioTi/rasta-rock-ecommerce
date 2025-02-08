import React from 'react'
import { Card, H2, Paragraph, Image, XStack, YStack, Stack, styled } from '@t4/ui'
import { trpc } from 'app/utils/trpc'
import { LinearGradient } from '@tamagui/linear-gradient'

// Define props for the CategoryCard component
type CategoryCardProps = {
  title: string
  subtitle: string
  imageUri: string
}

// Create semantic components with capitalized names
const Section = styled('section', {
  width: '100%',
  maxWidth: '100%',
  padding: '$4', // Default padding
  $md: { padding: '$5' }, // Medium screens
  $lg: { padding: '$6' }, // Large screens
  $xl: { padding: '$6' }, // Extra large screens
  $xxl: { padding: '$6' }, // Extra extra large screens
  backgroundColor: 'transparent',
})

const Article = styled('Article', {
  width: '100%',
  $xs: { width: '48%' },
  $gtXs: { width: '48%' },
  $md: { width: '32%' },
  $gtMd: { width: '32%' },
  $xl: { width: '24%' },
  $gtXl: { width: '24%' },
})

const Footer = styled('Footer', {
  paddingVertical: '$4',
  textAlign: 'center',
})

// Reusable CategoryCard component
const CategoryCard = ({ title, subtitle, imageUri }: CategoryCardProps) => {
  return (
    <Card
      elevate
      bordered
      size='$4'
      width='100%'
      height='$8'
      $md={{ height: '$10' }}
      $lg={{ height: '$12' }}
      borderRadius='$3'
      overflow='hidden'
      hoverStyle={{
        transform: 'translateY(-$1)',
        boxShadow: '0 4px 8px rgba(255, 215, 0, 0.5)',
      }}
      pressStyle={{ transform: 'scale(0.95)' }}
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.7)', 'transparent']}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '$3',
        }}
      />
      <YStack
        position='absolute'
        top={0}
        left={0}
        width='100%'
        height='100%'
        justifyContent='center'
        alignItems='center'
      >
        <H2 color='#FFFFFF' fontWeight='bold' textAlign='center'>
          {title}
        </H2>
        <Paragraph theme='alt2' color='#FFFFFF' textAlign='center'>
          {subtitle}
        </Paragraph>
      </YStack>
    </Card>
  )
}

// Main FeaturedCategoriesSection component
export const FeaturedCategoriesSection = () => {
  const categoryList = trpc.product.categories.useQuery()

  if (categoryList.isLoading) {
    return <Paragraph>Loading categories...</Paragraph>
  }

  if (categoryList.isError) {
    return <Paragraph>Error loading categories</Paragraph>
  }

  const categories = categoryList.data?.slice(0, 6) || []

  return (
    <YStack>
      <Section>
        <H2
          textAlign='center'
          paddingVertical='$4'
          $xs={{ fontSize: '$4' }}
          $md={{ fontSize: '$5' }}
          $lg={{ fontSize: '$6' }}
          color='#D4AF37' // Gold accent color
        >
          Featured Categories
        </H2>

        <XStack
          flexWrap='wrap'
          gap='$4'
          $md={{ gap: '$5' }}
          $lg={{ gap: '$6' }}
          $gtLg={{ gap: '$6' }}
          justifyContent='center'
        >
          {categories.map((category) => (
            <Article key={category.id}>
              <CategoryCard
                title={category.name}
                subtitle={category.description}
                imageUri={category.image}
              />
            </Article>
          ))}
        </XStack>

        <Footer>
          <Paragraph
            theme='alt2'
            $xs={{ fontSize: '$3' }}
            $md={{ fontSize: '$4' }}
            $lg={{ fontSize: '$5' }}
            color='#D4AF37' // Gold accent color
          >
            Explore all categories
          </Paragraph>
        </Footer>
      </Section>
    </YStack>
  )
}
