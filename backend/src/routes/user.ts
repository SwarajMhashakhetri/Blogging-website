import { signinInput, signupInput } from "@deckard_24/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	}
}>();

userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const {success} = signupInput.safeParse(body);
	if (!success) {
        c.status(411);
        return c.json({
            message: "Give Valid Inputs"
        })
    }
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
		const token = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({
			jwt: token
		});
	} catch (e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})

userRouter.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const {success} = signinInput.safeParse(body);
	if (!success) {
        c.status(411);
        return c.json({
            message: "Give Valid Inputs"
        })
    }
	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
			password: body.password
		}
	})

	if(!user) {
		c.status(403);
		return c.json({ error: "User does not exist" });
	}

	const token = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({
		jwt: token
	});
})