import React from 'react'
import { Card, H2, Paragraph, Image, XStack, YStack, Stack, styled } from '@t4/ui'

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
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background
})

const Article = styled('Article', {
  width: '100%', // Full width of grid cell
  $xs: { width: '48%' }, // 2 columns on xs and sm
  $gtXs: { width: '48%' }, // 2 columns on xs and sm
  $md: { width: '32%' }, // 3 columns on md and lg
  $gtMd: { width: '32%' }, // 3 columns on md and lg
  $xl: { width: '24%' }, // 4 columns on xl and xxl
  $gtXl: { width: '24%' }, // 4 columns on xl and xxl
})

const Footer = styled('Footer', {
  paddingVertical: '$4',
  textAlign: 'center',
})

// Reusable CategoryCard component
const CategoryCard = ({ title, subtitle, imageUri }: CategoryCardProps) => {
  return (
    <Card
      elevate // Adds a shadow for depth
      bordered // Adds a border
      size='$4' // Default size
      width='100%' // Full width of grid cell
      height='$8' // Default height
      $md={{ height: '$10' }} // Medium screens
      $lg={{ height: '$12' }} // Large screens
      borderRadius='$3' // Rounded corners
      overflow='hidden' // Ensures content stays within bounds
      hoverStyle={{
        transform: 'translateY(-$1)', // Lift effect on hover
        boxShadow: '0 4px 8px rgba(255, 215, 0, 0.5)', // Glow effect on hover
      }}
      pressStyle={{ transform: 'scale(0.95)' }} // Scale down on press
    >
      {/* Card 
      <Card.Background>
        <Image
          resizeMode="cover" // Ensures the image covers the card
          width="100%"
          height="100%"
          source={{ uri: imageUri || 'https://via.placeholder.com/300' }} // Fallback image
        />
      </Card.Background>
Background with Image */}

      {/* Gradient Overlay */}
      <YStack
        position='absolute'
        top={0}
        left={0}
        width='100%'
        height='100%'
        justifyContent='center'
        alignItems='center'
      >
        {/* Card Content */}
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
  const categories = [
    {
      id: 1,
      title: 'Category 1',
      subtitle: 'Now available',
      imageUri: 'https://via.placeholder.com/300',
    },
    {
      id: 2,
      title: 'Category 2',
      subtitle: 'Limited stock',
      imageUri: 'https://via.placeholder.com/300',
    },
    {
      id: 3,
      title: 'Category 3',
      subtitle: 'New arrivals',
      imageUri: 'https://via.placeholder.com/300',
    },
    {
      id: 4,
      title: 'Category 4',
      subtitle: 'On sale',
      imageUri: 'https://via.placeholder.com/300',
    },
    {
      id: 5,
      title: 'Category 5',
      subtitle: 'Coming soon',
      imageUri: 'https://via.placeholder.com/300',
    },
    {
      id: 6,
      title: 'Category 6',
      subtitle: 'Exclusive',
      imageUri: 'https://via.placeholder.com/300',
    },
  ]

  return (
    <YStack>
      <Section>
        <H2
          textAlign='center'
          paddingVertical='$4'
          $xs={{ fontSize: '$4' }} // Small screens
          $md={{ fontSize: '$5' }} // Medium screens
          $lg={{ fontSize: '$6' }} // Large screens
        >
          Featured Categories
        </H2>

        <XStack
          flexWrap='wrap' // Allows wrapping of cards
          gap='$4' // Default gap
          $md={{ gap: '$5' }} // Medium screens
          $lg={{ gap: '$6' }} // Large screens
          $gtLg={{ gap: '$67' }} // Large screens
          justifyContent='center' // Centers cards horizontally
        >
          {categories.map((category) => (
            <Article key={category.id}>
              <CategoryCard
                title={category.title}
                subtitle={category.subtitle}
                imageUri={category.imageUri}
              />
            </Article>
          ))}
        </XStack>

        <Footer>
          <Paragraph
            theme='alt2'
            $xs={{ fontSize: '$3' }} // Small screens
            $md={{ fontSize: '$4' }} // Medium screens
            $lg={{ fontSize: '$5' }} // Large screens
          >
            Explore all categories
          </Paragraph>
        </Footer>
      </Section>
    </YStack>
  )
}
