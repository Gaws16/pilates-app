-- Add capacity column to schedule table
ALTER TABLE schedule
ADD COLUMN capacity INTEGER DEFAULT 20 NOT NULL;

-- Update existing rows to have a default capacity of 20
UPDATE schedule
SET capacity = 20
WHERE capacity IS NULL;
