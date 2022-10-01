console.log('Hello World!');
import { createServer } from '@graphql-yoga/node';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

//  return [{ name: 'Nextjs' },{ name: 'Yoga'},{ name: 'GraphQL'}, { name: 'Nestjs' }, { name: 'Doddy'}];

const schema = {
  typeDefs: `
      type Query {
        hello: String
        users: [User!]!
       
      }
      type User {
        lname: String!
        fname: String!
        email: String!
     }
     type Book {
        title: String
        author: String
    }
    type Mutation{
      addUser(lname: String!, fname: String!, email: String!,bday: String!): User!
    }
    `,
  resolvers: {
    Query: {
      hello: () => 'Hello from Yoga!',
      users: async (__: any, _: any) => {
        return await prisma.user.findMany();
      },
    },
    Mutation: {
      addUser: async (
        parent: any,
        { lname, fname, email, bday }: any
      ) => {
        return await prisma.user.create({
          data: {
            email,
            lname,
            fname,
            bday,
          },
        });
      },
    },
  },
};

async function main() {
  const server = createServer({ schema });
  await server.start();
}

main();
