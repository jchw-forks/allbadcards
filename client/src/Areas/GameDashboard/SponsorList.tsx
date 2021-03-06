import React from "react";
import classNames from "classnames";
import {createStyles, Theme, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import {Platform} from "../../Global/Platform/platform";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => createStyles({
	callout: {
		textAlign: "center",
		marginTop: "10vh"
	},
	sponsors: {
		display: "flex",
		flexWrap: "wrap",
		marginTop: "1rem"
	},
	sponsor: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "7rem",
		boxSizing: "border-box",
		padding: "1rem",
		"& a": {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			width: "100%",
			height: "100%",
			color: theme.palette.secondary,
			textDecoration: "none",
			transition: "0.25s",
			"&:hover": {
				color: "#999"
			},
		}
	},
	noSponsor: {
		transition: "0.25s",
		"& a": {
			border: "1px dashed #BBB",
		},
		"&:hover": {
			background: "#EEE",
			borderColor: "#999"
		}
	},
	hasSponsor: {
		border: "none"
	}
}));

interface ISponsor
{
	url: string;
	src: string;
	byline: string;
	familyOnly: boolean;
}

export const SponsorList = (props: {familyMode: boolean}) =>
{
	const classes = useStyles();

	const sponsors: (ISponsor | undefined)[] = [
		{
			src: "/sponsors/carepod.png",
			byline: "🐾 Need a vacay to fly away with our pets 🐶",
			url: "https://flycarepod.link/games",
			familyOnly: false
		},
		{
			src: "/sponsors/songsaga.png",
			url: "https://song-saga.com",
			byline: "The music and story game that rocks 🤘",
			familyOnly: false
		},
		{
			byline: "Comprehensive Solutions for SMB",
			url: "https://www.concentricsolvesit.com/",
			src: "/sponsors/concentric-it-solutions.png",
			familyOnly: false
		},
		{
			byline: "🚀 Reboot during quarantine",
			url: "https://www.reboot-drink.com/",
			familyOnly: false,
			src: "/sponsors/reboot.jpg"
		},
		{
			byline: "Everyone will notice, no one will know",
			url: "https://www.novellusaesthetics.co.uk/",
			src: "/sponsors/novellusauesthetics2.jpeg",
			familyOnly: false
		},
		{
			url: "https://soundcloud.com/damndirtydrivein?source=abc",
			src: "/sponsors/damndirtydrivein.jpg",
			byline: "Stay Curious.",
			familyOnly: false
		},
		{
			byline: "🌿 Earth-friendly products for body & bath 🌼",
			url: "https://www.justlikejane.com/?source=abc",
			src: "/sponsors/justlikejane.jpg",
			familyOnly: true
		},
		undefined,
		undefined,
	];

	const sponsorsToUse = props.familyMode
		? sponsors
		: sponsors.map(a => a?.familyOnly ? undefined : a)

	return (
		<>
			<div className={classes.callout}>
				<Typography variant={"h6"}>
					Sponsors: Keeping Us Running!
				</Typography>
				<Typography variant={"body2"} style={{padding: "1rem 0", maxWidth: "30rem", margin: "auto"}}>
					This website operates with no ads or subscriptions. Donations and sponsorships support development and hosting.
					Follow the Patreon link below to contribute!
				</Typography>
				<div>
					<a href={"https://www.patreon.com/user?u=32889715"} target={"_blank"} rel={"noreferrer nofollow"}>
						<img src={"/become_a_patron_button.png"}/>
					</a>
				</div>
			</div>
			<Grid className={classes.sponsors}>
				<Sponsor sponsor={undefined} isDiamondSponsor={true}/>

				{sponsorsToUse.map((s, i)=>
					<Sponsor key={i} sponsor={s}/>
				)}

				<div style={{width: "100%"}}>
					<a href={"https://www.senahugheslauer.com/?source=abc"} style={{textDecoration: "none", display: "inline-block"}} target={"_blank"} onClick={() => Platform.trackEvent("sponsor-click", "sena")}>
						<Card style={{maxWidth: "30rem", margin: "4rem auto 0"}} elevation={7}>
							<CardMedia style={{paddingTop: "22.66667%"}} image={"/sponsors/shl.png"}/>
							<CardContent>
								<div style={{color: "#3090FF"}}>
									senahugheslauer.com
								</div>
								<Typography>
									My sister, without whom this site would not exist (it was her idea), is a communications
									consultant who can make your business shine. Here's her site so you can hire her, because she rocks.
								</Typography>
							</CardContent>
						</Card>
					</a>
				</div>
			</Grid>
		</>
	);
};

interface ISponsorProps
{
	isDiamondSponsor?: boolean;
	sponsor: ISponsor | undefined;
}

export const Sponsor: React.FC<ISponsorProps> = (props) =>
{
	const classes = useStyles();

	const wrapperClasses = classNames(classes.sponsor, {
		[classes.hasSponsor]: !!props.sponsor,
		[classes.noSponsor]: !props.sponsor,
	});

	return (
		<Grid item xs={12} sm={props.isDiamondSponsor ? 12 : 6} md={props.isDiamondSponsor ? 12 : 4} className={wrapperClasses}>
			<SponsorInner {...props} />
		</Grid>
	);
};

const useStylesBootstrap = makeStyles((theme: Theme) => ({
	arrow: {
		color: theme.palette.common.black,
	},
	tooltip: {
		backgroundColor: theme.palette.common.black,
		fontSize: "0.8rem",
		textAlign: "center"
	},
}));

const SponsorInner: React.FC<ISponsorProps> = (props) =>
{
	const url = props.sponsor?.url ?? "https://www.patreon.com/user?u=32889715";

	const byline = props.sponsor?.byline ?? (props.isDiamondSponsor ? "+ Diamond Sponsor" : "+ Sponsor");

	const track = () =>
	{
		Platform.trackEvent("sponsor-click", props.sponsor?.url);
	};

	const hasSponsor = props.sponsor !== undefined;

	const link = (
		<a href={url} target={"_blank"} rel={"noreferrer nofollow"} onClick={track}>
			{hasSponsor && (
				<div style={{
					width: "100%",
					height: "5rem",
					backgroundImage: `url(${props.sponsor?.src})`,
					backgroundSize: "contain",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center"
				}}/>
			)}

			<Typography style={{color: "black", fontSize: "12px"}}>
				{byline}
			</Typography>
		</a>
	);

	const classes = useStylesBootstrap();

	return (
		hasSponsor
			? link
			: (
				<Tooltip arrow classes={classes} title={"Become a Patreon sponsor. Email allbadcards[at]gmail.com for traffic information."}>
					{link}
				</Tooltip>
			)
	);
};