--TABLES--

create table Owner(
	owner_id serial primary key,
	first_name text,
	last_name text,
	address1 text,
	address2 text,
	mobile_no numeric
);

create table Car(
	plate_number text primary key,
	color text,
	brand_name text,
	model txt,
	rental_rate numeric,
	owner_id int references owner(owner_id)
);

create table UserAccount(
	user_id serial primary key,
	first_name text default null,
	last_name text default null,
	address1 text default null,
	address2 text default null,
	mobile_no numeric default null,
	email text unique not null,
	password text not null,
	is_admin boolean default false,
	is_customer boolean default false
);

-- New Admin

create or replace function new_admin(p_email text, p_password text) returns text as
$$
declare 
	v_email text;
	v_res text;

begin
	select into v_email email from UserAccount where email = p_email;

		if v_email isnull then
			if p_email = '' then
				v_res = 'Error';
			else
				insert into UserAccount(email, password, is_admin)
					values(p_email, p_password, TRUE);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Email already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

create table Rent(
	rental_id serial primary key,
	date_rented text,
	date_due date,
	date_returned date,
	total_bill numeric,
	overdue_cost numeric,
	plate_number int references car(plate_number),
	renter_id int references owner(user_id)
);