--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7
-- Dumped by pg_dump version 14.7

-- Started on 2023-05-07 13:56:17

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 16412)
-- Name: galleries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.galleries (
    id character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    "imageUrl" character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.galleries OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16465)
-- Name: programs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.programs (
    id character varying(255) NOT NULL,
    name character varying(255),
    goal character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.programs OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16404)
-- Name: users_auth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_auth (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    "imageUrl" character varying(255),
    address character varying(255),
    "birthDate" text,
    refresh_token text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users_auth OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16403)
-- Name: users_auth_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_auth_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_auth_id_seq OWNER TO postgres;

--
-- TOC entry 3327 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_auth_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_auth_id_seq OWNED BY public.users_auth.id;


--
-- TOC entry 3172 (class 2604 OID 16407)
-- Name: users_auth id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_auth ALTER COLUMN id SET DEFAULT nextval('public.users_auth_id_seq'::regclass);


--
-- TOC entry 3320 (class 0 OID 16412)
-- Dependencies: 211
-- Data for Name: galleries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.galleries (id, title, "imageUrl", description, "createdAt", "updatedAt") FROM stdin;
67fbe15c-315f-4b5b-b473-8f8733430dc9	Example Title 1	https://example.com/image1.jpg	This is an example description 1	2023-05-07 09:47:21.21+07	2023-05-07 09:47:21.215+07
3a8d1ac3-1b74-4753-8d7a-84af3666ef07	Example Title 2	https://example.com/image2.jpg	This is an example description 2	2023-05-07 09:47:32.083+07	2023-05-07 09:47:32.084+07
ed9410a5-c01f-4573-b438-21b12d97a5a8	Example Title 3	https://example.com/image3.jpg	This is an example description 3	2023-05-07 09:47:44.573+07	2023-05-07 09:47:44.574+07
\.


--
-- TOC entry 3321 (class 0 OID 16465)
-- Dependencies: 212
-- Data for Name: programs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.programs (id, name, goal, "createdAt", "updatedAt") FROM stdin;
b0ccf491-eca3-11ed-bd9a-7a791944a227	Readathon	Meningkatkan Daya tahan dan kebiasaan membaca	2023-05-07 08:46:15+07	2023-05-07 08:46:15+07
b0cd2101-eca3-11ed-bd9a-7a791944a227	Peringatan Isra Miraj Nabi Muhammad	Tingkatkan Keimanan dan ketaqwaan dalam rangka mencetak generasi yang berakhlaqul karimah	2023-05-07 08:46:15+07	2023-05-07 08:46:15+07
b0cd46cb-eca3-11ed-bd9a-7a791944a227	Karang Pamitran (Kwartir Ranting Cikalongkulon)	Melatih Keterampilan Pembina Untuk membangun pramuka yang berkarakter dan bersinergi muda	2023-05-07 08:46:15+07	2023-05-07 08:46:15+07
b0cd6a33-eca3-11ed-bd9a-7a791944a227	Rencana Proyek Kepemimpinan	Peningkatan Kompetensi guru melalui kegiatan workshop media pembelajaran google form	2023-05-07 08:46:15+07	2023-05-07 08:46:15+07
b0cd8e9c-eca3-11ed-bd9a-7a791944a227	Kenaikan Kelas & Pelepasan Kelas VI SDN Ciwaregu	Kenaikan Kelas & Pelepasan Kelas VI SDN Ciwaregu	2023-05-07 08:46:15+07	2023-05-07 08:46:15+07
b0cdb0fa-eca3-11ed-bd9a-7a791944a227	Pelaksanaan Ujian Nasional Berbasis Komputer SDN Ciwaregu	Pelaksanaan Ujian Nasional Berbasis Komputer SDN Ciwaregu	2023-05-07 08:46:15+07	2023-05-07 08:46:15+07
b0cdd2ac-eca3-11ed-bd9a-7a791944a227	Upacara Rutin	Pelaksanaan Upacara Rutin pengibaran bendera merah putih setiap hari senin	2023-05-07 08:46:15+07	2023-05-07 08:46:15+07
b0ce0041-eca3-11ed-bd9a-7a791944a227	Perlombaan 17 Agustus	pelaksanaan lomba-lomba untuk memperingati hari kemerdakaan Republik Indonesia	2023-05-07 08:46:15+07	2023-05-07 08:46:15+07
b0ce2a87-eca3-11ed-bd9a-7a791944a227	Pengecatan Dinding Lingkungan SDN Ciwaregu	memperbaiki dan mempercantik lingkungan SDN ciwaregu	2023-05-07 08:46:15+07	2023-05-07 08:46:15+07
b0ce5793-eca3-11ed-bd9a-7a791944a227	Solat berjamaah	Pelaksanaan solat berjamaah di lingkungan sd ciwaregu untuk membiasaakn beribadah para siswa dan siswa SDN Ciwaregu	2023-05-07 08:46:15+07	2023-05-07 08:46:15+07
b0ce8cf0-eca3-11ed-bd9a-7a791944a227	Pekan Olahraga	pelaksanaan senam pagi dan berbagai perlombaan agar siswa dan siswi dapat membiasakan hidup sehat	2023-05-07 08:46:15+07	2023-05-07 08:46:15+07
b0cec05c-eca3-11ed-bd9a-7a791944a227	Pertemuan Orang tua	Sosialisasi program SDN Ciwaregu kepada para orang tua murid	2023-05-07 08:46:15+07	2023-05-07 08:46:15+07
\.


--
-- TOC entry 3319 (class 0 OID 16404)
-- Dependencies: 210
-- Data for Name: users_auth; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_auth (id, name, email, password, "imageUrl", address, "birthDate", refresh_token, "createdAt", "updatedAt") FROM stdin;
1	user	asdfgh@gmail.com	$2b$10$fs/QRLQTFa7Uf8bqXO/25OxWS95b8jHpBNIbaSxQHIdcR3ny9gWzW	\N	bandung	2022-02-22	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJ1c2VyIiwiZW1haWwiOiJhc2RmZ2hAZ21haWwuY29tIiwiaWF0IjoxNjgzNDMzOTYwLCJleHAiOjE2ODM1MjAzNjB9.KE1vXbPj689UW93pHhsmYmkEzlMcH13sf8SEB3EvORQ	2023-05-07 10:28:29.348+07	2023-05-07 11:32:40.8+07
\.


--
-- TOC entry 3328 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_auth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_auth_id_seq', 1, true);


--
-- TOC entry 3176 (class 2606 OID 16418)
-- Name: galleries galleries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galleries
    ADD CONSTRAINT galleries_pkey PRIMARY KEY (id);


--
-- TOC entry 3178 (class 2606 OID 16471)
-- Name: programs programs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_pkey PRIMARY KEY (id);


--
-- TOC entry 3174 (class 2606 OID 16411)
-- Name: users_auth users_auth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_auth
    ADD CONSTRAINT users_auth_pkey PRIMARY KEY (id);


-- Completed on 2023-05-07 13:56:18

--
-- PostgreSQL database dump complete
--

