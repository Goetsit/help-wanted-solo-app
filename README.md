# Help Wanted

This application was built for those in need.
Help Wanted is an open source application centered around low-cost health care and services such as shelters and food shelves.
Users are provided with a straight-frward and clean view of available resources in the Twin Cities, with potential to expand to more areas. Users are able to recommend and/or bookmark resources, filter the resources by their criteria, and view the location with maps.

## Built With

Front-end:

- AngularJS

Server-side:

- NodeJS
- Express

Database:

- PostGreSQL

Framework:

- Angular Material

APIs:

- Google Places


### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- npm install pg, body-parser, angular, angular-route

### Installing

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
	"resourcestateid" int ,
	"description" varchar(500),
	"imageurl" varchar(500),
	"iswomens" BOOLEAN ,
	"ismental" BOOLEAN,
	"isservice" BOOLEAN ,
	"isnational" BOOLEAN ,
	"phone" varchar(20),
	"website" varchar(500),
	"isapproved" BOOLEAN,
	"enteredbyuserid" int NOT NULL,
	"dateentered" DATE,
	"recommendations" INT
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
	"bookmarkit" SERIAL PRIMARY KEY,
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


### Features

High level list of items completed.

- [x] Google Places
- [x] MD Dialog
- [x] Users are able to add resources via the User Tab

### Next Steps

Features that you would like to add at some point in the future.

- [ ] A seperate tab for admins to see when a new resource has been added
- [ ] Email notification to the admin when a resource has been added


## Authors

* Laura A. Goetz


## Acknowledgments

* Hunter Rancourt for helping set up Google Places
