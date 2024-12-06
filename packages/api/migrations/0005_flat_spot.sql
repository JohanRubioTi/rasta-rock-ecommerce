CREATE TABLE `Accountability` (
	`id` text PRIMARY KEY NOT NULL,
	`payment_id` text NOT NULL,
	`user_id` text,
	`action` text NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`notes` text,
	FOREIGN KEY (`payment_id`) REFERENCES `Payment`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Category` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `Payment` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text NOT NULL,
	`status` text DEFAULT 'PENDING',
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	`order_id` text NOT NULL,
	`description` text,
	`success_url` text,
	`back_url` text,
	`notification_url` text,
	FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Product` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`price` real NOT NULL,
	`category` text NOT NULL,
	`image_url` text NOT NULL,
	`stock_quantity` integer NOT NULL,
	`is_active` integer NOT NULL,
	FOREIGN KEY (`category`) REFERENCES `Category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Refund` (
	`id` text PRIMARY KEY NOT NULL,
	`payment_id` text NOT NULL,
	`amount` real NOT NULL,
	`status` text DEFAULT 'PENDING',
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`payment_id`) REFERENCES `Payment`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Video` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`url` text NOT NULL
);
--> statement-breakpoint
DROP TABLE `AuthMethod`;--> statement-breakpoint
DROP TABLE `Session`;--> statement-breakpoint
ALTER TABLE User ADD `first_name` text;--> statement-breakpoint
ALTER TABLE User ADD `last_name` text;--> statement-breakpoint
ALTER TABLE User ADD `address` text;--> statement-breakpoint
ALTER TABLE User ADD `zip_code` integer;--> statement-breakpoint
ALTER TABLE User ADD `phone` integer;--> statement-breakpoint
ALTER TABLE User ADD `role` text DEFAULT 'customer';--> statement-breakpoint
CREATE UNIQUE INDEX `Payment_order_id_unique` ON `Payment` (`order_id`);--> statement-breakpoint
ALTER TABLE `Car` DROP COLUMN `transmission`;