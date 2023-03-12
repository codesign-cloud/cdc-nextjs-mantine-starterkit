// Prisma client for NoSQL/MongoDB

import { PrismaClient as PrismaMongoClient } from '@prisma/client';

const prismaMongo = new PrismaMongoClient({
	datasources: {
		db: {
			url: 'mongodb://localhost:27017/myMongoDB',
		},
	},
});

export default prismaMongo;
