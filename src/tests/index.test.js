const {
  getDynamicSearchPlaceholder,
  getInitials,
  formatDate,
} = require("helpers/func");

describe("Testing the getDynamicSearchPlaceholder function", () => {
  it("returns the expected placeholder for a search input", () => {
    expect(
      getDynamicSearchPlaceholder("hmoId", {
        hmoId: "Search by HMO ID",
        name: "Search by name",
      })
    ).toMatchInlineSnapshot(`"Search by HMO ID"`);

    expect(
      getDynamicSearchPlaceholder("name", {
        hmoId: "Search by HMO ID",
        name: "Search by name",
      })
    ).toBe("Search by name");
  });
});

describe("Test getInitials function", () => {
  it("should get the initials of a double string", () => {
    expect(getInitials("John Doe")).toMatchInlineSnapshot(`"JD"`);
  });

  it("should get the initials of a thripe string", () => {
    expect(getInitials("John Middle Doe ")).toBe("JMD");
  });
});

describe("Test formatDate function", () => {
  it("should be able to format a correct date", () => {
    expect(
      formatDate(
        "Wed Jul 31 2024 00:00:00 GMT+0000 (Coordinated Universal Time)",
        "P"
      )
    ).toBe("07/31/2024");
  });

  it("should be able to format a wrong date", () => {
    expect(formatDate("sety456", "P")).toBe("No date");
  });
});
