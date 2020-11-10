-- Remove table
DROP TABLE IF EXISTS `ticket` CASCADE;

-- Recreate it
CREATE TABLE `ticket`
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    ticketDate  DATE,
    title       VARCHAR(255) NULL,
    cohort      VARCHAR(255) NULL,
    author      VARCHAR(255) NULL,
    description VARCHAR(255) NULL,
    solution    VARCHAR(255) NULL,
    links       VARCHAR(255) NULL,
    lastUpdated DATE         NULL,
    stopwatch   INTEGER(11)  NULL
);