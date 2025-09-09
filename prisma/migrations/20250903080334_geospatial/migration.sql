-- CreateTable
CREATE TABLE "LandMark" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "location_name" TEXT NOT NULL,
    "eastings" DOUBLE PRECISION NOT NULL,
    "northings" DOUBLE PRECISION NOT NULL,
    "eastings_error" DOUBLE PRECISION NOT NULL,
    "northings_error" DOUBLE PRECISION NOT NULL,
    "ellipsoidal_height" DOUBLE PRECISION NOT NULL,
    "ellipsoidal_height_error" DOUBLE PRECISION NOT NULL,
    "n_value" DOUBLE PRECISION NOT NULL,
    "mean_sea_level" DOUBLE PRECISION NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "psm_type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LandMark_pkey" PRIMARY KEY ("id")
);
