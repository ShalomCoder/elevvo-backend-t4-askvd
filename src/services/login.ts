import bcryptjs from "bcryptjs";

const demoUsers = [
    {
        username: "ask_vd",
        password: bcryptjs.hashSync("HelloWorld", 10)
    },
    {
        username: "demo_user",
        password: bcryptjs.hashSync("DemoPassword1", 10)
    },
    {
        username: "test_user",
        password: bcryptjs.hashSync("TestPassword1", 10)
    },
    {
        username: "admin_user",
        password: bcryptjs.hashSync("AdminPassword1", 10)
    },
    {
        username: "guest_user",
        password: bcryptjs.hashSync("GuestPassword1", 10)
    }
];

export default async function login(
    username: string,
    password: string
): Promise<boolean> {
    const demoUser = demoUsers.find((user) => user.username === username);

    if (!demoUser) {
        return false;
    }

    return bcryptjs.compare(password, demoUser.password);
}