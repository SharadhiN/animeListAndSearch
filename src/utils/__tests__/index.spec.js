import * as Utils from "../index";

describe("Utils", () => {
    // Time right now -  Tuesday, 18 July 2023 20:18:27 GMT+05:30
    const unix_date = 1689691708;

    describe("setLocalStorageItem", () => {
        Utils.setLocalStorageItem("user", "user101@gmail.com");
        let result = JSON.parse(localStorage.getItem("user"));
        expect(result).toBe("user101@gmail.com");
    });


    describe("getLocalStorageItem", () => {
        it("returns data from the local storage", () => {
            Utils.setLocalStorageItem("name", "anilist-unofficial");
            const result = Utils.getLocalStorageItem("name");
            expect(result).toBe("anilist-unofficial");
        });

        it("returns null if value is not found in the local storage", () => {
            const result = Utils.getLocalStorageItem("new-key");
            expect(result).toEqual(null);
        });

    });
});