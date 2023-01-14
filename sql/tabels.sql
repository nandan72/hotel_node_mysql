create database hotel_managment;

use hotel_managment;

create table customer(
    customer_id int auto_increment,
    first_name varchar(20),
    last_name varchar(20),
    age int,
    date_of_birth date,
    phone_number int,
    password varchar(20),
    primary key(customer_id)

);
desc customer;

create room_deatils(
    room_deatils_id int primary key,
    room_type int,
    room_price int
);
desc room_details;

create table booking(
    room_id int primary key,
    check_in_date date,
    check_out_date date,
    room_details_id int,
    customer_id int,
    foreign key (customer_id) 
    references customer(customer_id),
    foreign key (room_deatils_id)
    references room_deatils(room_deatils_id)
);
desc booking;

create table payment(
    payment_id int primary key auto_increment,
    total_no_days int,
    total_price int,
    room_id int,
    customer_id int,
    foreign key (room_id)
    references booking(room_id)
);
desc payment;

create table bill(
    bill_id int primary key auto_increment,
    transaction_id varchar(20),
    payment_pending_status varchar(20),
    generated_date date,
    payment_id int,
    foreign key (payment_id)
    references payment(payment_id)
);
desc bill;

create table admin(
    admin_id int primary key auto_increment,
    admin_name varchar(20),
    admin_username varchar(20),
    admin_password varchar(20),
    admin_role varchar(20)
);
desc admin;
