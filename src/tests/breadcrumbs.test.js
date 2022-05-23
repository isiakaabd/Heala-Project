const {
  predicateBreadcrumbFromUrl,
  patterns,
  replaceWithGenerics,
  pathParamsRegex,
} = require("helpers/breadcrumb");

describe("Testing the breadcrumbs function", () => {
  it("Returns the expected value", () => {
    expect(
      predicateBreadcrumbFromUrl(
        patterns,
        "patients/626cd83eeb876e0014b8fb69/consultations/case-note/626cdda0b2315100132869a5"
      )
    ).toMatchInlineSnapshot(`
      Array [
        "Patients",
        "Patient view",
        "Consultations",
        "Consultation Details",
      ]
    `);

    expect(
      predicateBreadcrumbFromUrl(patterns, "patients/626cd83eeb876e0014b8fb69")
    ).toMatchInlineSnapshot(`
        Array [
          "Patients",
          "Patient view",
        ]
      `);
  });

  it("Id regex works as expected", () => {
    const uuidRegex = /^(\w|\d)+$/;
    expect(uuidRegex.test("626cd83eeb876e0014b8fb69")).toBe(true);
    expect(uuidRegex.test("626cd83eeb876e0014b8-fb69-")).toBe(false);
  });

  it("should work", () => {
    const regex = new RegExp(
      replaceWithGenerics(pathParamsRegex, patterns["Consultations"])
    );

    const value = regex.test(
      "patients/626cd83eeb876e0014b8fb69/consultations/case-note/626cdda0b2315100132869a5"
    );

    expect(value).toBe(true);
  });

  it("replaceGenerics", () => {
    const generics = {
      ...pathParamsRegex,
      code: "ORD",
    };

    expect(replaceWithGenerics(generics, "/{id}/{code}")).toMatchInlineSnapshot(
      `"/(\\\\w|\\\\d)+/ORD"`
    );
  });
});
