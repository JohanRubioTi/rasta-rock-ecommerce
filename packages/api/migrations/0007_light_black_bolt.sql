CREATE TABLE `ShipmentTracking` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`shipment_id` text NOT NULL,
	`tracking_url` text NOT NULL,
	`status` text DEFAULT 'PENDING',
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`order_id`) REFERENCES `Payment`(`order_id`) ON UPDATE no action ON DELETE no action
);
