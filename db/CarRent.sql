--TABLES--

create table Owner(
	owner_id serial primary key,
	first_name text,
	last_name text,
	address1 text,
	address2 text,
	mobile_no numeric
);

-- Add Owner

create or replace function new_owner(p_fname text, p_lname text, p_add1 text, p_add2 text, p_mobile_no numeric) returns text as
$$
declare 
	v_fname text;
	v_res text;

begin
	select into v_fname from Owner where first_name = p_fname;
		if v_fname isnull then
			if p_fname = '' or p_lname = '' or p_add1 = '' or p_add2 = '' or p_mobile_no = null then 
				v_res = 'Error';
			else 
				insert into Owner(first_name, last_name, address1, address2, mobile_no)
						values(p_fname, p_lname, p_add1, p_add2, p_mobile_no);
						v_res = 'Ok';
			end if;
		else
			v_res = 'Owner already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- select new_owner('o1', 'o1', 'add1', 'add1', 1);

create table Car(
	plate_number text primary key,
	color text,
	brand_name text,
	model text,
	rental_rate numeric,
	owner_id int references owner(owner_id)
);

-- select new_car('ghx-938', 'silver', 'mitsubishi', 'lancer 1996', 10, 1)

-- Add Car

create or replace function new_car(p_plate_number text, p_color text, p_brand_name text, p_model text, p_rental_rate numeric, p_owner_id int) returns text as
$$
declare 
	v_plate_number text;
	v_res text;

begin 
	select into v_plate_number from Car where plate_number = p_plate_number;
		if v_plate_number isnull then
			if p_plate_number = '' or p_color = '' or p_brand_name = '' or p_model = '' or p_rental_rate = null or p_owner_id = null then
				v_res = 'Error';
			else
				insert into Car(plate_number, color, brand_name, model, rental_rate, owner_id)
					values(p_plate_number, p_color, p_brand_name, p_model, p_rental_rate, p_owner_id);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Car already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

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
			if p_email = '' or p_password = '' then
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

-- select new_admin('yulgurz@gmail.com', 'password');

-- New Customer

create or replace function new_customer(p_email text, p_password text) returns text as
$$
declare 
	v_email text;
	v_res text;

begin
	select into v_email email from UserAccount where email = p_email;

		if v_email isnull then
			if p_email = '' or p_password = '' then
				v_res = 'Error';
			else
				insert into UserAccount(email, password, is_customer)
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

-- select new_customer('c1@gmail.com', 'password');


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