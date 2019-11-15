const db = require("../data/dbconfig");

const { add} = require("../users/usermodule");

describe("users model", function() {
  describe("add()", function() {
    beforeEach(async () => {
      await db("userdb").truncate();
    });

    it("should insert a user", async function() {
      // insert a user into the db
      await add({ username: "pamm", password:"pass" });

      // check if it was inserted into the db
      const userdb = await db("userdb"); // read from db directly
      expect(userdb).toHaveLength(1); // at least we know one record was inserted
    });

    it("should insert the provided user", async function() {
      await add({ username: "pamm", password: "pass" });
      await add({ username: "gaffer", password: "pass" });

      const userdb = await db("userdb"); // read from db directly

      expect(userdb).toHaveLength(2); // both records are there
      expect(userdb[0].username).toBe("sam"); // the first record is sam
      expect(userdb[0].password).toBe("pass"); 
      expect(userdb[1].username).toBe("gaffer"); // the second record is gaffer
      expect(userdb[1].password).toBe("pass"); 
    });

    it("should return the inserted hobbit", async function() {
      let hobbit = await insert({ name: "sam" });
      expect(hobbit.name).toBe("sam");
      expect(hobbit.id).toBeDefined(); // now I know it's coming from the db

      hobbit = await add({ username: "gaffer" });
      expect(hobbit.username).toBe("gaffer");
      expect(hobbit.id).toBeDefined();
    });
  });
});
