import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {      
      name: 'Jhon Doe',
      email: 'john.doe2@gmail.com',
      avatarUrl: 'https://github.com/josealves380.png',
    }
  })
  const pool = await prisma.pool.create({
    data: {
      title: 'Example',
      code: 'JOS113',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-02T14:48:37.627Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    }
  })
  await prisma.game.create({
    data: {
      date: '2022-11-02T17:48:37.627Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'DE',
    
      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect:{
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })
}
main()