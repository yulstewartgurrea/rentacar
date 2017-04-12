--TABLES--

create table owner(
	owner_id serial primary key,
	first_name text,
	last_name text,
	address1 text,
	address2 text,
	mobile_no numeric
);

create table car(
	plate_number text primary key,
	color text,
	brand_name text,
	model txt,
	rental_rate numeric,
	CarOwner int references owner(owner_id)
);

create table user(
	User_id serial primary key,
	first_name text,
	last_name text,
	address1 text,
	address2 text,
	mobile_no numeric,
	email text unique,
	password txt,
	is_admin boolean default false
);

create table rent(
	rental_id serial primary key,
	date_rented text,
	date_due,
	date_returned,
	total_bill,
	overdue_cost numeric,
	Car int references car(car_id),
	Renter int references owner(owner_id)
);