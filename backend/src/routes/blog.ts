import { createBlogInput, updateBlogInput } from '@deckard_24/medium-common';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { verify } from 'hono/jwt'

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	},
	Variables: {
		userId: string
	}
}>();

blogRouter.use('/*', async (c, next) => {
	const authHeader = c.req.header('Authorization');
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = authHeader.split(' ')[1];
	try {
		const payload = await verify(token, c.env.JWT_SECRET)
		if (!payload) {
			c.status(401)
			return c.json({ error: 'unauthorized' })
		}
		//@ts-ignore
		c.set("userId", payload.id);
		await next()
	} catch (e) {
		c.status(403);
		return c.json({ error: 'Unauthorized' });
	}
})


blogRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const {success} = createBlogInput.safeParse(body);
	if (!success) {
        c.status(411);
        return c.json({
            message: "Give Valid Inputs"
        })
    }
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	})
	return c.json({
		id: post.id
	});
});


blogRouter.put('/', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const {success} = updateBlogInput.safeParse(body);
	if (!success) {
        c.status(411);
        return c.json({
            message: "Give Valid Inputs"
        })
    }
	const post = await prisma.post.update({
		where: {
			id: body.id
		},
		data: {
			title: body.title,
			content: body.content
		}
	})
	return c.json({
		id: post.id
	})
});


blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const posts = await prisma.post.findMany({
		select: {
			content: true,
			id: true,
			title: true,
			author: {
				select: {
					name: true
				}
			}
		}
	});
	return c.json(posts);
});


blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate());

	try {
		const post = await prisma.post.findUnique({
			where: {
				id
			},
			select:{
				id:true,
				title:true,
				content:true,
				author:{
					select:{
						name:true
					}
				}
			}
		})
		return c.json({
			post
		})
	} catch (e) {
		c.status(411);
		return c.json({
			message: "Error While Fetching The Post"
		})
	}
});


