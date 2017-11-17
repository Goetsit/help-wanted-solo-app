# Name of Project

One Paragraph of project description goes here. Link to the live version of the app if it's hosted on Heroku.

## Built With

List technologies and frameworks here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- List other prerequisites here


### Installing

Steps to get the development environment running.

```sql


CREATE TABLE "locationstate" (
	"stateid" serial NOT NULL,
	"statename" varchar(100) NOT NULL,
	CONSTRAINT locationstate_pk PRIMARY KEY ("stateid")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "resources" (
	"resourceid" serial NOT NULL,
	"resourcename" varchar(500) NOT NULL,
	"resourcestateid" int NOT NULL,
	"description" varchar(500),
	"imageurl" varchar(500),
	"iswomens" BOOLEAN NOT NULL,
	"ismental" BOOLEAN NOT NULL,
	"isservice" BOOLEAN NOT NULL,
	"isnational" BOOLEAN NOT NULL,
	"phone" varchar(20),
	"website" varchar(500),
	"isapproved" BOOLEAN NOT NULL,
	"enteredbyuserid" int NOT NULL,
	"dateentered" DATE NOT NULL,
	CONSTRAINT resources_pk PRIMARY KEY ("resourceid")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "resourceaddress" (
	"resourceid" int NOT NULL,
	"addressid" int NOT NULL
) WITH (
  OIDS=FALSE
);
CREATE TABLE "addresses" (
	"addressid" serial NOT NULL,
	"streetaddress" varchar(500) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(2) NOT NULL,
	"zip" varchar(20) NOT NULL,
	CONSTRAINT addresses_pk PRIMARY KEY ("addressid")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "resourceinsurance" (
	"resourceid" int NOT NULL,
	"insuranceid" int NOT NULL
) WITH (
  OIDS=FALSE
);
CREATE TABLE "insurances" (
	"insuranceid" serial NOT NULL,
	"insurername" varchar(300),
	"isaccepted" bool NOT NULL,
	CONSTRAINT insurances_pk PRIMARY KEY ("insuranceid")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "usermaster" (
	"userid" serial NOT NULL,
	"username" varchar(300) NOT NULL,
	"stateid" int NOT NULL,
	"password" varchar(500) NOT NULL,
	"datecreated" DATE NOT NULL,
	CONSTRAINT usermaster_pk PRIMARY KEY ("userid")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "userbookmarked" (
	"userid" int NOT NULL,
	"resourceid" int NOT NULL
) WITH (
  OIDS=FALSE
);
CREATE TABLE "usercomments" (
	"resourceid" int NOT NULL,
	"userid" int NOT NULL,
	"comment" varchar(1000) NOT NULL,
	"commentid" serial NOT NULL,
	"dateentered" DATE NOT NULL,
	CONSTRAINT usercomments_pk PRIMARY KEY ("commentid")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "hoursofoperation" (
	"rowid" serial NOT NULL,
	"resourceid" serial NOT NULL,
	"mondayhours" varchar(50),
	"tuesdayhours" varchar(50),
	"wednesdayhours" varchar(50),
	"thursdayhours" varchar(50),
	"fridayhours" varchar(50),
	"saturdayhours" varchar(50),
	"sundayhours" varchar(50),
	CONSTRAINT hoursofoperation_pk PRIMARY KEY ("rowid")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "resources" ADD CONSTRAINT "resources_fk0" FOREIGN KEY ("resourcestateid") REFERENCES "locationstate"("stateid");
ALTER TABLE "resources" ADD CONSTRAINT "resources_fk1" FOREIGN KEY ("enteredbyuserid") REFERENCES "usermaster"("userid");
ALTER TABLE "resourceaddress" ADD CONSTRAINT "resourceaddress_fk0" FOREIGN KEY ("resourceid") REFERENCES "resources"("resourceid");
ALTER TABLE "resourceaddress" ADD CONSTRAINT "resourceaddress_fk1" FOREIGN KEY ("addressid") REFERENCES "addresses"("addressid");
ALTER TABLE "resourceinsurance" ADD CONSTRAINT "resourceinsurance_fk0" FOREIGN KEY ("resourceid") REFERENCES "resources"("resourceid");
ALTER TABLE "resourceinsurance" ADD CONSTRAINT "resourceinsurance_fk1" FOREIGN KEY ("insuranceid") REFERENCES "insurances"("insuranceid");
ALTER TABLE "usermaster" ADD CONSTRAINT "usermaster_fk0" FOREIGN KEY ("stateid") REFERENCES "locationstate"("stateid");
ALTER TABLE "userbookmarked" ADD CONSTRAINT "userbookmarked_fk0" FOREIGN KEY ("userid") REFERENCES "usermaster"("userid");
ALTER TABLE "userbookmarked" ADD CONSTRAINT "userbookmarked_fk1" FOREIGN KEY ("resourceid") REFERENCES "resources"("resourceid");
ALTER TABLE "usercomments" ADD CONSTRAINT "usercomments_fk0" FOREIGN KEY ("resourceid") REFERENCES "resources"("resourceid");
ALTER TABLE "usercomments" ADD CONSTRAINT "usercomments_fk1" FOREIGN KEY ("userid") REFERENCES "usermaster"("userid");
ALTER TABLE "hoursofoperation" ADD CONSTRAINT "hoursofoperation_fk0" FOREIGN KEY ("resourceid") REFERENCES "resources"("resourceid");



INSERT INTO "locationstate" ("statename") VALUES ('MN')

INSERT INTO "usermaster"(
						 "username"
						 ,"stateid"
						 ,"password"
						 ,"datecreated"
					    )
VALUES (
			'lauragoetz'
			,(SELECT "stateid" FROM "locationstate" WHERE "stateid" = 1)
			,'a'
			,'2017-11-17'
		)



INSERT INTO "resources"(
					  "resourcename"
					  ,"resourcestateid"
					  ,"description"
					  ,"imageurl"
					  ,"iswomens"
					  ,"ismental"
					  ,"isservice"
					  ,"isnational"
					  ,"phone"
					  ,"website"
					  ,"isapproved"
					  ,"enteredbyuserid"
					  ,"dateentered") VALUES (
								  				'TestResource'
								  				,(SELECT "stateid" FROM "locationstate" WHERE "stateid" = 1)
								  				,'this resource is for testing'
								  				,''
								  				,TRUE
								  				,FALSE
								  				,TRUE
								  				,TRUE
								  				,'867-5309'
								  				,'https://google.com'
								  				,TRUE
								  				,(SELECT "userid" FROM "usermaster" WHERE "userid" = 1)
								  				,'2017-11-17'
								 			 );



```

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Feature a
- [x] Feature b

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Name of author(s)


## Acknowledgments

* Hat tip to anyone who's code was used
