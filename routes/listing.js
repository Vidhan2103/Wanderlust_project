const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// INDEX ROUTE & CREATE ROUTE
router.route("/")
.get( wrapAsync ( listingController.index ) )
.post( isLoggedIn, validateListing, upload.single( 'listing[image][url]' ), wrapAsync( listingController.createListing ) );

// NEW ROUTE
router.get("/new",isLoggedIn, listingController.renderNewForm);

// SHOW ROUTE & UPDATE ROUTE & DELETE ROUTE 
router.route("/:id")
.get( wrapAsync(listingController.showListing) )
.put( isLoggedIn,isOwner, validateListing, upload.single( 'listing[image][url]' ), wrapAsync (listingController.updateListing))
.delete( isLoggedIn,isOwner, wrapAsync (listingController.destroyListing));

//EDIT ROUTE
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editForm));







module.exports = router;