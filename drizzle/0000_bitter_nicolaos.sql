CREATE TABLE `boardgames` (
	`id` integer PRIMARY KEY NOT NULL,
	`thumbnail` text NOT NULL,
	`image` text NOT NULL,
	`name` text NOT NULL,
	`year` integer NOT NULL,
	`description` text,
	`minplayers` integer NOT NULL,
	`maxplayers` integer NOT NULL,
	`playtime` integer NOT NULL,
	`minplaytime` integer NOT NULL,
	`maxplaytime` integer NOT NULL,
	`minage` integer NOT NULL
);
