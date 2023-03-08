import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

	const alice = await prisma.user.upsert({
		where: { email: 'alice11@prisma.io' },
		update: {},
		create: {
			email: 'alice11@prisma.io',
			name: 'Alice A',
			Content: {
				create: {
					title: 'Check out Prisma with Next.js',
					slug: 'blog-112',
					type: 'blog',
					stage: 'published',
					visibility: 'public',
					content: 'https://www.prisma.io/nextjs',
				},
			},
		},
	})
	/** /
	const bob = await prisma.user.upsert({
		where: { email: 'bob@prisma.io' },
		update: {},
		create: {
			email: 'bob@prisma.io',
			name: 'Bob',
			posts: {
				create: [
					{
						title: 'Follow Prisma on Twitter',
						content: 'https://twitter.com/prisma',
						published: true,
					},
					{
						title: 'Follow Nexus on Twitter',
						content: 'https://twitter.com/nexusgql',
						published: true,
					},
				],
			},
		},
	})
	/**/
	console.log({ alice })
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
