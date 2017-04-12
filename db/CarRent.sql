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
	owner_id int references owner(owner_id)
);

create table user(
	user_id serial primary key,
	first_name text,
	last_name text,
	address1 text,
	address2 text,
	mobile_no numeric,
	email text unique not null,
	password text not null,
	is_admin boolean default false
	is_customer boolean default false
);

create table rent(
	rental_id serial primary key,
	date_rented text,
	date_due date,
	date_returned date,
	total_bill numeric,
	overdue_cost numeric,
	plate_number int references car(plate_number),
	renter int references owner(user_id)
);