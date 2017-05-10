--TABLES--

create table Owner(
	owner_id serial primary key,
	owner_first_name text,
	owner_last_name text,
	owner_address1 text,
	owner_address2 text,
	owner_mobile_no numeric
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
				insert into Owner(owner_first_name, owner_last_name, owner_address1, owner_address2, owner_mobile_no)
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

-- Get car owners
create or replace function get_carowners(out int, out text, out text, out text, out text, out numeric) returns setof record as
$$
	select owner_id, owner_first_name, owner_last_name, owner_address1, owner_address2, owner_mobile_no from Owner;
$$
	language 'sql';

-- Get car owner by id
create or replace function get_carownerbyid(in p_owner_id int, out int, out text, out text, out text, out text, out numeric) returns setof record as
$$
	select owner_id, owner_first_name, owner_last_name, owner_address1, owner_address2, owner_mobile_no from Owner where owner_id = p_owner_id;
$$
	language 'sql';

-- Update Owner
create or replace function update_carowner(p_owner_id int, p_owner_fname text, p_owner_lname text, p_owner_add1 text, p_owner_add2, text,
										p_owner_mobile_no numeric) returns void as
$$
	update Owner
	set
		owner_first_name = p_owner_fname,
		owner_last_name = p_owner_lname,
		owner_address1 = p_owner_add1,
		owner_address2 = p_owner_add2,
		owner_mobile_no = p_owner_mobile_no

	where 
	owner_id = p_owner_id
$$
	language 'sql';

create table Car(
	car_plate_number text primary key,
	car_color text,
	car_model text,
	car_rental_rate numeric,
	car_image text,
	car_owner_id int references Owner(owner_id),
	car_category_name text references Category(category_name),
	car_brandname text references Brand(brandname)
);

create table CarPix(
	cp_id serial primary key,
	image1 text,
	image2 text,
	image3 text,
	image4 text,
	plate_number text references Car(plate_number)

);

-- Add Car

create or replace function new_car(p_plate_number text, p_color text, p_brandname text, p_model text, p_rental_rate numeric,
									p_image text, p_owner_id int, p_category_name text) returns text as
$$
declare 
	v_plate_number text;
	v_res text;

begin 
	select into v_plate_number from Car where car_plate_number = p_plate_number;
		if v_plate_number isnull then
			if p_plate_number = '' or p_color = '' or p_brandname = '' or p_model = '' or p_rental_rate = null or
				p_owner_id = null or p_image = null or p_category_name = null  then
				v_res = 'Error';
			else
				insert into Car(car_plate_number, car_color, car_brandname, car_model, car_rental_rate, car_image, car_owner_id, car_category_name)
					values(p_plate_number, p_color, p_brandname, p_model, p_rental_rate, p_image, p_owner_id, p_category_name);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Car already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

select new_car('ghx-938', 'silver', 'Mitsubishi', 'lancer 1996', 10, 'image1', 1, 'Compact Vehicle');
select new_car('kdh-662', 'gold', 'Isuzu', 'crosswind 2006', 10, 'image1', 1, 'MPV');

-- Update Car
create or replace function update_car(in p_plate_number text, p_color text, p_brandname text, p_model text, p_rental_rate numeric,
									p_image text, p_owner_id int, p_category_name text) returns void as
$$
	update Car
	set 
		car_color = p_color,
		car_model = p_model,
		car_rental_rate = p_rental_rate,
		car_image = p_image,
		car_category_name = p_category_name,
		car_owner_id = p_owner_id,
		car_brandname = p_brandname
	where 
		car_plate_number = p_plate_number
$$
	language 'sql';

select car_update('ghx-938', 'black', 'Mitsubishi', 'lancer 1996', 10, 'image10', 2, 'SUV');

-- Get all Cars
create or replace function get_cars(out text, out text, out text, out text, out numeric, out text, out int, out text) returns setof record as
$$
	select car_plate_number, car_color, car_brandname, car_model, car_rental_rate, car_image, car_owner_id, car_category_name from Car;
$$
	language 'sql';

-- Get car by plate_number
create or replace function get_carbyplatenumber(in p_plate_number text, out text, out text, out text, out text, out numeric, out text, out int, out text) returns setof record as
$$
	select car_plate_number, car_color, car_brandname, car_model, car_rental_rate, car_image, car_owner_id, car_category_name from Car where car_plate_number = p_plate_number;
$$
	language 'sql';

-- select get_carbyplatenumber('ghx-938');	

-- Get car by category
create or replace function get_carbycategory(in p_category_name text, out text, out text, out text, out text, out numeric, out text, out int) returns setof record as
$$
	select car_plate_number, car_color, car_brandname, car_model, car_rental_rate, car_image, car_owner_id from Car where car_category_name = p_category_name;
$$
	language 'sql';

-- select get_carbycategory('Compact Vehicle');

-- Get car by brandname
create or replace function get_carbybrandname(in p_brandname text, out text, out text, out text, out numeric, out text, out int, out text) returns setof record as
$$
	select car_plate_number, car_color, car_model, car_rental_rate, car_image, car_owner_id, car_category_name from Car where car_brandname = p_brandname;
$$
	language 'sql';

-- select get_carbybrandname('Mitsubishi');
-- select get_carbybrandname('Isuzu');
-- select get_carbybrandname('Honda');
-- select get_carbybrandname('Toyota');

-- Get car by category and brandname
create or replace function get_carbycategorybrandname(in p_category_name text, in p_brandname text, out text, out text, out text, out numeric, out text, out int) returns setof record as
$$
	select car_plate_number, car_color, car_model, car_rental_rate, car_image, car_owner_id from Car where car_category_name = p_category_name and car_brandname = p_brandname;
$$
	language 'sql';

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

-- Get customers
create or replace function get_customers(out int, out text, out text, out text, out text, out numeric, out text,
										out text, out boolean, out boolean) returns setof record as
$$
	select user_id, first_name, last_name, address1, address2, mobile_no, email,
			password, is_admin, is_customer from UserAccount where is_customer = TRUE;
$$
	language 'sql';

-- Login
create or replace function login(p_email text, p_password text) returns text as
$$
declare
	v_email text;
	v_res text;

begin
	select into v_email email from UserAccount where email = p_email and password = p_password;
	if v_email isnull or p_email = '' or p_password = '' then
		v_res = 'Invalid credentials';
	else
		v_res = 'Login successful';
	end if;
	return v_res;
end;
$$
	language 'plpgsql';

-- Login role with users email
create or replace function get_userbyemail(in p_email text, out int, out text, out text, out text, 
										out text, out numeric, out boolean, out boolean) returns setof record as
$$
	select user_id, first_name, last_name, address1, address2, mobile_no, is_admin, is_customer from UserAccount where email = p_email;
$$
	language 'sql';

create table Category(
	category_name text primary key
);

-- New category
create or replace function new_category(p_category_name text) returns text as
$$
declare
	v_category_name text;
	v_res text;

begin
	select into v_category_name category_name from Category where category_name = p_category_name;

		if v_category_name isnull then
			if p_category_name = '' then
				v_res = 'Error';
			else
				insert into Category(category_name)
					values(p_category_name);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Category already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- select new_category('SUV');
-- select new_category('Compact Vehicle');
-- select new_category('Van');
-- select new_category('Pick-Up Truck');
-- select new_category('Construction');

-- Get category 
create or replace function get_category(out text) returns setof text as 
$$
	select category_name from Category;
$$
	language 'sql';

create table Brand(
	brandname text primary key
);

-- New brandname
create or replace function new_brand(p_brandname text) returns text as
$$
declare
	v_brandname text;
	v_res text;

begin
	select into v_brandname brandname from Brand where brandname = p_brandname;

		if v_brandname isnull then
			if p_brandname = '' then
				v_res = 'Error';
			else
				insert into Brand(brandname)
					values(p_brandname);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Brand already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- select new_brand('Toyota');
-- select new_brand('Isuzu');
-- select new_brand('Honda');
-- select new_brand('Mitsubishi');
-- select new_brand('Ford');
-- select new_brand('Hyundai');

-- Get Brand
create or replace function get_brand(out text) returns setof text as
$$
	select brandname from Brand;
$$
	language 'sql';

create or replace function get_categorybrand(out text, out text) returns setof record as
$$
	select Category.category_name, Brand.brandname From Category Cross Join Brand;
$$
	language 'sql';

create or replace function get_categorybrand2(out text, out text) returns setof record as
$$ 
	select category_name, brandname From Category, Brand;
$$
	language 'sql';

create table Cart(
	cart_id serial primary key,
	cart_total numeric,
	cart_time_added timestamp default current_timestamp ,
	cart_plate_number text references Car(car_plate_number),
	cart_user_id int references UserAccount(user_id)
);

create or replace function cart_add_product(p_cart_plate_number text, p_user_id) returns text as
$$
declare
	v_cart_plate_number text;
	v_res text; 

begin
	select into v_cart_plate_number cart_plate_number from Cart where cart_plate_number = p_cart_plate_number;

		if v_cart_plate_number isnull then
			if p_cart_plate_number = '' then
				v_res = 'Error';
			else
				insert into Cart(cart_plate_number, cart_user_id)
					values(p_cart_plate_number, p_user_id);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Car already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql' 

create or replace function get_cartbyuser(in p_user_id int, out text, out text, out text, out text, out numeric, out text) returns setof text as 
$$
	Car.category_name, Car.brandname, Car.car_model, Car.color, Car.car_rental_rate, Car.car_image from Car where user_id = p_user_id
$$
	language 'sql';

create table Rents(
	rental_id serial primary key,
	date_rented timestamp default current_timestamp,
	date_due date,
	date_returned timestamp default current_timestamp,
	total_bill numeric,
	overdue_cost numeric,
	plate_number text references Car(car_plate_number),
	renter_id int references Owner(user_id)
);

create table rent_detail(
	rental_id int references Rents(rental_id)
	car_plate_number text references Car(car_plate_number)
	quantity int,
	unit_cost numeric

);


-- create table CartItem(
-- 	cartitem_cart_id int references Cart(cart_id),
-- 	cartitem_item text references Car(plate_number),
-- 	quantity int default 1,
-- 	cartitem_added date
-- );
