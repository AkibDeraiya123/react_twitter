--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: follow; Type: TABLE; Schema: public; Owner: akib
--

CREATE TABLE follow (
    id integer NOT NULL,
    follower_id integer,
    follow_id integer
);


ALTER TABLE follow OWNER TO akib;

--
-- Name: follow_id_seq; Type: SEQUENCE; Schema: public; Owner: akib
--

CREATE SEQUENCE follow_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE follow_id_seq OWNER TO akib;

--
-- Name: follow_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: akib
--

ALTER SEQUENCE follow_id_seq OWNED BY follow.id;


--
-- Name: registration; Type: TABLE; Schema: public; Owner: akib
--

CREATE TABLE registration (
    user_id integer NOT NULL,
    fname text,
    email text,
    lname text,
    password text,
    profile text,
    phone_no bigint,
    activation_number text,
    activation_status integer,
    forgot_string text
);


ALTER TABLE registration OWNER TO akib;

--
-- Name: registration_id_seq; Type: SEQUENCE; Schema: public; Owner: akib
--

CREATE SEQUENCE registration_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE registration_id_seq OWNER TO akib;

--
-- Name: registration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: akib
--

ALTER SEQUENCE registration_id_seq OWNED BY registration.user_id;


--
-- Name: tweet_like; Type: TABLE; Schema: public; Owner: akib
--

CREATE TABLE tweet_like (
    id integer NOT NULL,
    like_date text,
    user_id integer,
    tweet_id integer
);


ALTER TABLE tweet_like OWNER TO akib;

--
-- Name: tweet_like_id_seq; Type: SEQUENCE; Schema: public; Owner: akib
--

CREATE SEQUENCE tweet_like_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tweet_like_id_seq OWNER TO akib;

--
-- Name: tweet_like_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: akib
--

ALTER SEQUENCE tweet_like_id_seq OWNED BY tweet_like.id;


--
-- Name: user_tweet; Type: TABLE; Schema: public; Owner: akib
--

CREATE TABLE user_tweet (
    id integer NOT NULL,
    user_id integer,
    tweet text,
    timest timestamp without time zone DEFAULT now(),
    post_image text
);


ALTER TABLE user_tweet OWNER TO akib;

--
-- Name: user_tweet_id_seq; Type: SEQUENCE; Schema: public; Owner: akib
--

CREATE SEQUENCE user_tweet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_tweet_id_seq OWNER TO akib;

--
-- Name: user_tweet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: akib
--

ALTER SEQUENCE user_tweet_id_seq OWNED BY user_tweet.id;


--
-- Name: follow id; Type: DEFAULT; Schema: public; Owner: akib
--

ALTER TABLE ONLY follow ALTER COLUMN id SET DEFAULT nextval('follow_id_seq'::regclass);


--
-- Name: registration user_id; Type: DEFAULT; Schema: public; Owner: akib
--

ALTER TABLE ONLY registration ALTER COLUMN user_id SET DEFAULT nextval('registration_id_seq'::regclass);


--
-- Name: tweet_like id; Type: DEFAULT; Schema: public; Owner: akib
--

ALTER TABLE ONLY tweet_like ALTER COLUMN id SET DEFAULT nextval('tweet_like_id_seq'::regclass);


--
-- Name: user_tweet id; Type: DEFAULT; Schema: public; Owner: akib
--

ALTER TABLE ONLY user_tweet ALTER COLUMN id SET DEFAULT nextval('user_tweet_id_seq'::regclass);


--
-- Data for Name: follow; Type: TABLE DATA; Schema: public; Owner: akib
--

COPY follow (id, follower_id, follow_id) FROM stdin;
22	30	19
23	34	19
24	1	19
25	19	1
\.


--
-- Name: follow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: akib
--

SELECT pg_catalog.setval('follow_id_seq', 25, true);


--
-- Data for Name: registration; Type: TABLE DATA; Schema: public; Owner: akib
--

COPY registration (user_id, fname, email, lname, password, profile, phone_no, activation_number, activation_status, forgot_string) FROM stdin;
33	Om	omprakash@improwised.com	Prakash	omp1	f94e3b2e41af07ab3875c06621562738	9737334772	4c88b9964652ecc1df36	1	9adeefea488d96bdb52e
34	piyu	piyush@improwised.com	sh	a	default.png	9737334772	efc78506a608a8ad0161	0	\N
29	Akib	akib@improwised1.com	Deraiya	a	9e4b9dabd02377c14e562feed5e6db99	9737334772	febd820c71269189e2d2	1	\N
31	akib Realtest	akib@improwised2.com	Deraiya	a	default.png	9737334772	323dc3e9c457faa7d7b0	1	\N
19	Akib S	akibderaiya12@gmail.com	Deraiya	akib	default.png	973734772	febd820c71269189e2d4	1	\N
1	Akib	akibderaiya123@gmail.com	Deraiya	akibderaiya	d4a90b08dc60de672d78134f6e2abc2a	9737334772	febd820c71269189e2d3	1	\N
35	a	abcd@dfdl.com	a	a	94ee4e11ccb1705b7f6d66971d34f2f6	9737334772	1511bc7e345f2f9180e0	1	\N
30	Om	omprakash1@improwised2.com	Prakash	a	default.png	1234567890	057ed665c1d4e939f4b6	0	\N
32	Akib	akib3@improwised.com	Deraiya	ab	bae56b60645bb5aad25c5ce45d80673b	9737334772	efe4b5c5bba7a83c618e	1	2c1df9a85903258f19a6
36	abcd	akib@improwised.com	efgh	a	default.png	9737334772	9e692e241a80870e363e	1	82f7443eb7e256befff5
\.


--
-- Name: registration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: akib
--

SELECT pg_catalog.setval('registration_id_seq', 36, true);


--
-- Data for Name: tweet_like; Type: TABLE DATA; Schema: public; Owner: akib
--

COPY tweet_like (id, like_date, user_id, tweet_id) FROM stdin;
3	\N	19	14
2	\N	1	14
4	\N	19	6
5	\N	1	6
\.


--
-- Name: tweet_like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: akib
--

SELECT pg_catalog.setval('tweet_like_id_seq', 5, true);


--
-- Data for Name: user_tweet; Type: TABLE DATA; Schema: public; Owner: akib
--

COPY user_tweet (id, user_id, tweet, timest, post_image) FROM stdin;
6	1	dfgdsfgrt	2017-01-27 11:05:54.936018	645a2cf901201ab61a0a70c90d0869cb
7	1	ghdfgh	2017-01-27 11:42:05.673939	
8	1	fsthrtyr	2017-01-27 11:42:10.518525	49a3a760fdbaffa152a23c70099e1b99
9	1	dfhdfhdfh	2017-01-30 12:09:34.479482	42d8ec0759ccfec7bcdb81cef2d17102
10	1	fgdfgdfg	2017-01-31 07:31:17.111479	04deace48888124017caef786f065ece
11	1	dfhdfhdf	2017-02-01 05:16:25.921389	
13	1	dfgdsfgdg	2017-02-01 05:52:25.322983	e335c47e5b7540c3b5617079f74530b8
12	1	dfdfdf	2017-02-01 05:16:33.159802	87af94a2f3351531077e81688e843b12
1	19	At Big Cinema, Crystal Mall, Rajkot	2017-01-27 06:45:51.06088	0ac4b1c2fd8da367a9796574cb35e425
5	19	fghfgyjftyyjty	2017-01-27 11:05:39.731697	d74fd28a76dee1431945ca0ce5a45813
2	1	Watching Ind Vs Eng First Match #1st t20	2017-01-27 06:46:38.231061	0ac4b1c2fd8da367a9796574cb35e425
14	1	gfytyu	2017-02-03 07:44:28.255458	
15	19	thid id dfkdflk	2017-02-07 12:34:03.04735	
16	19	sdfsdfsadf	2017-02-07 12:34:18.61541	
\.


--
-- Name: user_tweet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: akib
--

SELECT pg_catalog.setval('user_tweet_id_seq', 16, true);


--
-- Name: follow follow_pkey; Type: CONSTRAINT; Schema: public; Owner: akib
--

ALTER TABLE ONLY follow
    ADD CONSTRAINT follow_pkey PRIMARY KEY (id);


--
-- Name: registration registration_email_key; Type: CONSTRAINT; Schema: public; Owner: akib
--

ALTER TABLE ONLY registration
    ADD CONSTRAINT registration_email_key UNIQUE (email);


--
-- Name: registration registration_pkey; Type: CONSTRAINT; Schema: public; Owner: akib
--

ALTER TABLE ONLY registration
    ADD CONSTRAINT registration_pkey PRIMARY KEY (user_id);


--
-- Name: tweet_like tweet_like_pkey; Type: CONSTRAINT; Schema: public; Owner: akib
--

ALTER TABLE ONLY tweet_like
    ADD CONSTRAINT tweet_like_pkey PRIMARY KEY (id);


--
-- Name: user_tweet user_tweet_pkey; Type: CONSTRAINT; Schema: public; Owner: akib
--

ALTER TABLE ONLY user_tweet
    ADD CONSTRAINT user_tweet_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

