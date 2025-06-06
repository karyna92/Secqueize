UPDATE phones
SET brand_id = (
  SELECT id FROM brands WHERE brands.name = phones.brand
);

ALTER TABLE "Brands" RENAME TO "Companies";

DROP TABLE "Companies";