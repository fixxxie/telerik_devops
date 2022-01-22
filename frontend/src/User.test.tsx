import User from "./User";

it("has an initializer", () => {
	const user = new User("username", "email", "name");

	expect(user.username).toEqual("username");
	expect(user.email).toEqual("email");
	expect(user.name).toEqual("name");
});
