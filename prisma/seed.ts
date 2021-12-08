import { PrismaClient } from '@prisma/client'
import data from './films.json'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')
  for (const film of data) {
    const result = await prisma.film.create({
      data: {
        ...film,
        lastUpdate: new Date(film.lastUpdate)
      }
    })
    console.log('film created with id:', result.id)
  }

  console.log('Seeding complete...')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })