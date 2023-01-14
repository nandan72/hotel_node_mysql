insert into customer(first_name,last_name,phone_number,email,city,age,password,date_of_birth) values('nithin','gowda',789546,'nn@123','bengalueru',12,1234,12/03/2002);
insert into customer(first_name,last_name,phone_number,email,city,age,password,date_of_birth) values('nithin','gowda',789546,'nn@123','bengalueru',12,1234,12/03/2002);
insert into customer(first_name,last_name,phone_number,email,city,age,password,date_of_birth) values('nithin','gowda',789546,'nn@123','bengalueru',12,1234,12/03/2002);
insert into customer(first_name,last_name,phone_number,email,city,age,password,date_of_birth) values('nithin','gowda',789546,'nn@123','bengalueru',12,1234,12/03/2002);

select room_id from booking;

select * from customer

select * from room_details where room_type='normal1';

insert into booking values(id1,id2,room_details_id,checkindate,checkoutdate)

select customer.first_name,customer.customer_id,booking.room_id,customer.phone_number,booking.room_details_id from customer inner join(booking) on customer.customer_id=booking.customer_id where customer.customer_id=12;

select customer.first_name,customer.customer_id,booking.room_id,customer.phone_number,booking.room_details_id,customer.age from customer inner join(booking) on customer.customer_id=booking.customer_id