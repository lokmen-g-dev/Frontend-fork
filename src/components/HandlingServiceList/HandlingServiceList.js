import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import { Button, Link, Container, Grid, Modal, Spacer, Text, } from "@nextui-org/react";
import { IconButton } from "./../NextUiIcons/IconButton";
import { EyeIcon } from "./../NextUiIcons/EyeIcon"
import HandlingService from '../../service/HandlingService';
import { Redirect } from 'react-router-dom';
import './HandlingServiceList.css';
import EmployeeService from '../../service/EmployeeService';
import NotFound from './../404/404'
import i18next from "i18next"
import FullCalendar from '@fullcalendar/react';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import adaptivePlugin from "@fullcalendar/interaction";
import moment, { isMoment } from 'moment';
import { ListBox } from 'primereact/listbox';
import { PanelMenu } from 'primereact/panelmenu';
import { Toast } from 'primereact/toast';
import { add, startOfDay, endOfDay, addMinutes, setHours, setMinutes } from 'date-fns';
import { useRef } from 'react';
import { Checkbox } from "primereact/checkbox";
import Form from 'react-bootstrap/Form';
import { PickList } from 'primereact/picklist';
import { ButtonPrime } from 'primereact/button';


const HandlingServiceList = () => {

    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const [selectedEvent, setSelectedEvent] = useState();
    const [servicesList, setServicesList] = useState([]);
    const [planClass, setPlanClass] = useState([]);
    const [semaines, setSemaines] = useState()
    const [altKeyPressed, setAltKeyPressed] = useState(false);
    const [ctrlKeyPressed, setCtrlKeyPressed] = useState(false);
    const [curentView, setCurentView] = useState('timeGridWeek')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)

    const [postion, setPosition] = useState()
    const [selectedCity, setSelectedCity] = useState(null);
    const [events, setEvents] = useState([])
    const [rattrapage, setRattrapage] = useState([]);
    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);
    const [forceRender, setForceRender] = useState(false); // Variable d'état pour déclencher le rendu
    const [selectedSemaines, setSelectedSemaines] = useState([]);

    const handleCheckboxChange = (event, semaine) => {
        const updatedSemaines = semaines.map((s) => {
            if (s.id === semaine.id) {
                return { ...s, checked: event.target.checked };
            }
            return s;
        });

        setSemaines(updatedSemaines);

        if (event.target.checked) {
            setSelectedSemaines((prevSelectedSemaines) => [...prevSelectedSemaines, semaine]);
        } else {
            setSelectedSemaines((prevSelectedSemaines) =>
                prevSelectedSemaines.filter((s) => s.id !== semaine.id)
            );
        }
    };

    const CheckboxItem = ({ semaine }) => {

        return (
            <div key={semaine.id} style={{ marginRight: '10px' }}>
                <Checkbox
                    checked={semaine.checked}
                    onChange={(e) => handleCheckboxChange(e, semaine)}
                />
                <Form.Check.Label style={{ marginLeft: '5px' }}> {semaine.id} </Form.Check.Label>
            </div>
        );
    };

    const handleClose = () => {
        setShow(false)
        setShow2(false)
        setShow3(false)

    };
    const handleShow = () => {
        setVisible(!visible)
    };

    const handleShow2 = () => {
        setShow(true)
    };


    const [values, setValues] = useState({
        title: '',
        start: '',
        end: '',
        color: ''
    })



    useEffect(() => {


        HandlingService.getAllClasses()
            .then(
                (result) => {
                    setServicesList(result.data);
                },
            )
        HandlingService.getSemainesOfSemestre()
            .then(
                (result) => {
                    setSemaines(result.data);
                },
            )
    }, [])

    useEffect(() => {


        if (selectedCity) {
            HandlingService.getAllPlanClasse(selectedCity?.codeCl)
                .then(
                    (result) => {
                        setPlanClass(result.data);
                    },
                )
        }

    }, [selectedCity?.codeCl])


    const handleSelect = (info) => {
        showModal();
        console.log('handleSelect: VAR Info = ', info)
        setValues({
            ...values,
            start: moment(new Date(info.startStr)).format('YYYY-MM-DD HH:mm:ss'),
            //start:new Date(info.startStr),
            //start:format(info.startStr, "MMMM do, yyyy H:mma"),
            end: moment(new Date(info.endStr)).format('YYYY-MM-DD HH:mm:ss')
            //end:new Date(info.endStr),
            //end:format(info.endStr, "MMMM do, yyyy H:mma")
        })
        console.log('handleSelect: VAR values = ', values)
    }

    const onChangeVaules = (e) => {
        console.log('onChangeVaules: VAR e.target.value = ', e.target.value)
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    useEffect(() => {
        const externalEventsContainer = externalEventsRef.current;
        const calendarApi = calendarRef.current.getApi();

        // Mettre à jour la configuration de l'API du calendrier
        calendarApi.setOption('eventClassNames', (arg) => {
            const { event } = arg;
            const { extendedProps, title } = event;
            const { id_ens2, codeModule } = extendedProps;

            // Vérifier si le codeModule de l'événement déposé existe dans le tableau rattrapage
            const hasThreeModule = rattrapage.some((item) => item.title === title);

            if (hasThreeModule) {
                return 'blueEvent '; // Appliquer une classe CSS pour la couleur bleue
            } else if (id_ens2) {
                return 'multiEnsModule'; // Appliquer une classe CSS pour la couleur spécifique
            } else {
                return 'soloEnsModule'; // Appliquer une classe CSS pour la couleur verte
            }
        });
    }, [forceRender]); // Effectuer la mise à jour lorsque la variable forceRender change


    useEffect(() => {
        if (externalEventsRef.current && calendarRef.current) {
            const externalEventsContainer = externalEventsRef.current;
            const calendarApi = calendarRef.current.getApi();

            new Draggable(externalEventsContainer, {
                itemSelector: '.external-event',
                eventData(eventEl) {
                    const idEns = eventEl.dataset.idEns;
                    const idEns2 = eventEl.dataset.idEns2;
                    const codeModule = eventEl.dataset.codeModule;


                    console.log(idEns) // Récupérer la valeur de l'attribut data-id-ens
                    return {
                        title: eventEl.innerText,
                        duration: '01:30',
                        extendedProps: {
                            id_ens: idEns,
                            id_ens2: idEns2 ? idEns2 : null,
                            codeModule: codeModule
                        } // Ajouter l'attribut id_ens avec la valeur de idEns (converti en entier)
                        // Autres proprié tés  de l'événement
                    };

                },
            }
            )

            calendarApi.setOption('eventContent', (arg) => {
                const { event } = arg;
                const { title, extendedProps } = event;
                const { id_ens, id_ens2 } = extendedProps;

                let idEns2Content = '';
                if (id_ens2) {
                    idEns2Content = `<div>Id Ens 2: ${id_ens2}</div>`;
                }

                return {
                    html: `
                    <div>
                      <div>Module: ${title}</div>
                      <div>Id Ens: ${id_ens}</div>
                      ${idEns2Content}
                    </div>
                  `,
                };
            });

            const addEventToRattrapage = (event) => {
                setRattrapage((prevEvents) => [...prevEvents, event]);
                setForceRender((prev) => !prev); // Inverser la valeur pour déclencher le rendu
            };




            calendarApi.on('eventReceive', (receiveInfo) => {
                const { event } = receiveInfo;
                const { title, start } = event;


                if ((start.getHours() >= 9 && start.getHours() < 10) || (start.getHours() === 10 && start.getMinutes() < 15)) {

                    const newStart = setHours(start, 9); // Définir l'heure de début à 9h
                    const adjustedStart = setMinutes(newStart, 0); // Ajuster les minutes à zéro

                    event.setStart(adjustedStart); // Mettre à jour l'heure de début de l'événement
                    event.setEnd(addMinutes(adjustedStart, 90)); // Définir la durée à 1 heure et 10 minutes

                    setEvents((prevEvents) => [...prevEvents, event]);
                } else if ((start.getHours() === 10 && start.getMinutes() === 15)) {

                    const newStart = setHours(start, 9); // Définir l'heure de début à 9h
                    const adjustedStart = setMinutes(newStart, 0); // Ajuster les minutes à zéro

                    event.setStart(adjustedStart); // Mettre à jour l'heure de début de l'événement
                    event.setEnd(addMinutes(adjustedStart, 195)); // Définir la durée à 1 heure et 10 minutes
                    setEvents((prevEvents) => [...prevEvents, event]);


                } else if ((start.getHours() >= 10 && start.getHours() < 12) || (start.getHours() === 12 && start.getMinutes() === 0)) {
                    const newStart = setHours(start, 10); // Définir l'heure de début à 9h
                    const adjustedStart = setMinutes(newStart, 45); // Ajuster les minutes à zéro

                    event.setStart(adjustedStart); // Mettre à jour l'heure de début de l'événement
                    event.setEnd(addMinutes(adjustedStart, 90)); // Définir la durée à 1 heure et 10 minutes

                    setEvents((prevEvents) => [...prevEvents, event]);

                }
                else if ((start.getHours() === 13 && start.getMinutes() > 15) || (start.getHours() === 14 && start.getMinutes() < 45)) {
                    const newStart = setHours(start, 13);
                    const adjustedStart = setMinutes(newStart, 30);

                    event.setStart(adjustedStart);
                    event.setEnd(addMinutes(adjustedStart, 90));

                    setEvents((prevEvents) => [...prevEvents, event]);

                }
                else if ((start.getHours() === 14 && start.getMinutes() === 45)) {
                    const newStart = setHours(start, 13);
                    const adjustedStart = setMinutes(newStart, 30);

                    event.setStart(adjustedStart);
                    event.setEnd(addMinutes(adjustedStart, 195));

                    setEvents((prevEvents) => [...prevEvents, event]);

                }
                else if ((start.getHours() === 13 && start.getMinutes() > 15) || (start.getHours() === 14 && start.getMinutes() < 45)) {
                    const newStart = setHours(start, 13);
                    const adjustedStart = setMinutes(newStart, 30);

                    event.setStart(adjustedStart);
                    event.setEnd(addMinutes(adjustedStart, 90));

                    setEvents((prevEvents) => [...prevEvents, event]);

                }
                else if ((start.getHours() >= 15)) {
                    const newStart = setHours(start, 15);
                    const adjustedStart = setMinutes(newStart, 15);

                    event.setStart(adjustedStart);
                    event.setEnd(addMinutes(adjustedStart, 90));

                    setEvents((prevEvents) => [...prevEvents, event]);

                }
                else {
                    // Ajouter l'événement tel quel
                    setEvents((prevEvents) => [...prevEvents, event]);
                }


                console.log('External event created:', title);
                console.log('Start date/time:', event.start);
                console.log('End date/time:', event.end);
            });
            calendarApi.on('eventDrop', (dropInfo) => {
                const { event, oldEvent, el, delta, revert } = dropInfo;
                const { title, start } = event;

                if ((start.getHours() >= 9 && start.getHours() < 10) || (start.getHours() === 10 && start.getMinutes() < 15)) {
                    const newStart = setHours(start, 9);
                    const adjustedStart = setMinutes(newStart, 0);

                    event.setStart(adjustedStart);
                    event.setEnd(addMinutes(adjustedStart, 90));

                    setEvents(calendarApi.getEvents());
                } else if ((start.getHours() === 10 && start.getMinutes() === 15)) {
                    const newStart = setHours(start, 9);
                    const adjustedStart = setMinutes(newStart, 0);

                    event.setStart(adjustedStart);
                    event.setEnd(addMinutes(adjustedStart, 195));

                    setEvents(calendarApi.getEvents());
                } else if ((start.getHours() >= 10 && start.getHours() < 12) || (start.getHours() === 12 && start.getMinutes() === 0)) {
                    const newStart = setHours(start, 10);
                    const adjustedStart = setMinutes(newStart, 45);

                    event.setStart(adjustedStart);
                    event.setEnd(addMinutes(adjustedStart, 90));

                    setEvents(calendarApi.getEvents());
                } else if ((start.getHours() === 13 && start.getMinutes() > 15) || (start.getHours() === 14 && start.getMinutes() < 45)) {
                    const newStart = setHours(start, 13);
                    const adjustedStart = setMinutes(newStart, 30);

                    event.setStart(adjustedStart);
                    event.setEnd(addMinutes(adjustedStart, 90));

                    setEvents(calendarApi.getEvents());
                } else if ((start.getHours() === 14 && start.getMinutes() === 45)) {
                    const newStart = setHours(start, 13);
                    const adjustedStart = setMinutes(newStart, 30);

                    event.setStart(adjustedStart);
                    event.setEnd(addMinutes(adjustedStart, 195));

                    setEvents(calendarApi.getEvents());
                } else if ((start.getHours() === 13 && start.getMinutes() > 15) || (start.getHours() === 14 && start.getMinutes() < 45)) {
                    const newStart = setHours(start, 13);
                    const adjustedStart = setMinutes(newStart, 30);

                    event.setStart(adjustedStart);
                    event.setEnd(addMinutes(adjustedStart, 90));

                    setEvents(calendarApi.getEvents());
                } else if (start.getHours() >= 15) {
                    const newStart = setHours(start, 15);
                    const adjustedStart = setMinutes(newStart, 15);

                    event.setStart(adjustedStart);
                    event.setEnd(addMinutes(adjustedStart, 90));

                    setEvents(calendarApi.getEvents());
                } else {
                    // Pas de modification nécessaire, ajouter l'événement tel quel
                    setEvents(calendarApi.getEvents());
                }

                console.log('Event updated:', title);
                console.log('Start date/time:', start);
            });

            setEvents(calendarRef.current.getApi().getEvents())

            calendarApi.render(); // Render the calendar to make sure eventDrop is triggered for external events

        }
    }, []);
    const addWeek = (date, x) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + x * 7);
        return newDate;
    };

    const handleButtonClick = () => {
        if (altKeyPressed) {
            alert(true);
        }
    };


    const cloneEventToNextWeek = (event, x) => {

        const startDate = event.start;
        const endDate = event.end;
        const duration = endDate.getTime() - startDate.getTime();
        const newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + ((x - 1) * 7));

        const calendarApi = calendarRef.current.getApi();
        const clonedEvent = {
            title: event._def.title,
            id_ens: event.extendedProps.id_ens,
            id_ens2: event.extendedProps.id_ens2,

            start: newDate,
            end: new Date(newDate.getTime() + duration),
        };

        console.log(event)
        // Check for overlapping events
        const events = calendarApi.getEvents();
        const isOverlap = events.some((existingEvent) => {
            const existingStart = existingEvent.start;
            const existingEnd = existingEvent.end;

            // Compare the start and end times of the cloned event with the existing event
            const isSameTime =
                (clonedEvent.start >= existingStart && clonedEvent.start < existingEnd) ||
                (clonedEvent.end > existingStart && clonedEvent.end <= existingEnd);

            return isSameTime;
        });

        if (isOverlap) {
            // An overlapping event exists, handle accordingly (e.g., show an error message)
            setShow(false);
            showError("An overlapping event exists. Cannot clone the event.");
            console.log('An overlapping event exists. Cannot clone the event.');
            return;
        }

        calendarApi.addEvent(clonedEvent);
        setEvents(calendarRef.current.getApi().getEvents())

        showInfo("Seance cloné avec succées")
        setShow(false);
    };

    const externalEventsRef = React.createRef();
    const calendarRef = React.createRef();
    const toast = useRef(null);



    const findEventInCalendar = (eventToCheck, x) => {
        const newStart = eventToCheck?.start;
        const newEnd = eventToCheck?.end;
        const duration = newEnd?.getTime() - newStart?.getTime();

        const newDate = new Date(newStart);
        newDate.setDate(newDate.getDate() + ((x - 1) * 7));

        const eventToSearch = {
            title: eventToCheck?._def.title,
            start: newDate,
            end: new Date(newDate.getTime() + duration),
        };

        const foundEvent = events.find((event) => {
            const checkTime =
                (eventToSearch.start >= event.start && eventToSearch.start < event.end) ||
                (eventToSearch.end > event.start && eventToSearch.end <= event.end);
            const checkTitle = event.title === eventToSearch.title;
            return checkTitle && checkTime;
        });

        return foundEvent;
    };


    // const CheckIfExist = (event, x) => {

    //     const calendarApi = calendarRef.current.getApi();
    //     const events = calendarApi.getEvents();

    //     const startDate = event.start;
    //     const endDate = event.end;
    //     const duration = endDate.getTime() - startDate.getTime();
    //     const newDate = new Date(startDate);
    //     newDate.setDate(newDate.getDate() + x * 7);

    //     const eRechechré = {
    //         title: event._def.title,
    //         start: startDate,
    //         end: new Date(newDate.getTime() + duration),
    //     };



    //     const isOverlap = events.some((existingEvent) => {
    //         const existingStart = existingEvent.start;
    //         const existingEnd = existingEvent.end;

    //         // Compare the start and end times of the cloned event with the existing event
    //         const isSameTime =
    //             (eRechechré.start >= existingStart && eRechechré.start < existingEnd) ||
    //             (eRechechré.end > existingStart && eRechechré.end <= existingEnd);

    //         return isSameTime;
    //     });
    //     console.log(events)
    //     console.log(eRechechré)
    //     return isOverlap


    // }

    // useEffect(() => {
    //     if (calendarRef.current) {
    //         const calendarApi = calendarRef.current.getApi();

    //         calendarApi.on('eventDragStart', (arg) => {
    //             const draggedEvent = arg.event;

    //             calendarApi.on('eventDrop', (dropArg) => {
    //                 const droppedEvent = dropArg.event;
    //                 // Vérifier si les deux événements se chevauchent

    //                 // Permuter les deux événements
    //                 swapEvents(draggedEvent, droppedEvent, calendarApi);
    //                 draggedEvent = null;
    //                 droppedEvent = null



    //             });
    //         });
    //     }
    // }, []);


    const swapEvents = (event1, event2, calendarApi) => {
        // Récupérer les positions des deux événements
        const { start: start1, end: end1 } = event1;
        const { start: start2, end: end2 } = event2;

        // Mettre à jour les positions des événements
        calendarApi.unselect(); // Désélectionner les événements pour éviter les conflits de sélection
        event1.setDates(start2, end2);
        event2.setDates(start1, end1);

    };



    const eventClick = eventClick => {
        if (ctrlKeyPressed) {
            setShow3(true)
        }
        else if (altKeyPressed) {
            setShow2(true)
        }
        else handleShow2()
        setSelectedEvent(eventClick.event)
        setPosition({ x: window.event.clientX, y: window.event.clientY })
    }
    const items = [
        {
            label: "Plan d'etude",
            icon: 'pi pi-fw pi-file',
            command: () => {
                handleShow()
            },
            disabled : selectedSemaines.length===0
        },
        {
            label: 'Rattrapage',
            icon: 'pi pi-fw pi-pencil',
            command: () => {
                handleButtonClick()
            }
        },
        {
            label: 'Cours dépositionnées',
            icon: 'pi pi-fw pi-user',
        }
    ];

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.altKey) {
                setAltKeyPressed(true);
            }
        };

        const handleKeyUp = () => {
            setAltKeyPressed(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Control') {
                setCtrlKeyPressed(true);
            }
        };

        const handleKeyUp = (event) => {
            if (event.key === 'Control') {
                setCtrlKeyPressed(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);





    const showError = (message) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
    }
    const showInfo = (message) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
    }


    if (!AuthUser) {
        return <Redirect to="/login" />;
    }

    if (AuthUser.role !== "Admin") {
        return <NotFound />;
    }



    return (

        <>
            <SideBar />
            <NavBar />
            <div className="homeContent">
                <Toast ref={toast} position="bottom-right" />
                <div className="edtClasse">
                    <div className='sideBarClasse'>

                        <label className="font-bold block mb-2">Choisir une Classe {selectedSemaines?.length}</label>
                        <ListBox filter value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={servicesList} optionLabel="codeCl" className="w-full md:w-8rem" listStyle={{ height: '220px' }} placeholder="Search" />
                        {selectedCity ? <PanelMenu model={items} className="w-full md:w-25rem" /> : ""}
                        <Grid.Container gap={2}>



                            <div className="planetudte   active" hidden={!visible}>
                                <div ref={externalEventsRef} id="external-events" >
                                    {planClass.map(serv =>

                                        <div data-id-ens={serv.idEns}
                                            data-id-ens2={serv.idEns2}
                                            data-code-module={serv.id.codeModule}

                                            className={`external-event ${serv.idEns2 ? 'bg-danger' : 'bg-success'}`}
                                        >
                                            {serv.designation}
                                        </div>

                                    )}
                                    -------------------------------------
                                    Rattrapage <br />
                                    -------------------------------------

                                    {rattrapage.map(serv =>

                                        <div
                                            className={`external-event ${serv.idEns2 ? 'bg-danger' : 'bg-success'}`}
                                        >
                                            {serv.title}
                                        </div>

                                    )}
                                </div>
                            </div>


                        </Grid.Container>
                    </div>
                    <div>
                        {/* Liste des semaines : */}

                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', justifyContent: 'center' }}>
                            {semaines?.map((semaine) => (
                                <CheckboxItem key={semaine.id} semaine={semaine} />
                            ))}
                        </div>


                        {/* Calendrier */}
                        <FullCalendar
                            locale={frLocale}
                            // eventContent={EventDetail}
                            ref={calendarRef}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, adaptivePlugin]}


                            initialView="timeGridWeek"
                            headerToolbar={{
                                //left:'prevYear,prev,next,nextYear',
                                left: 'title',
                                //center: 'title',
                                center: '',
                                //right: 'today dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                                right: 'prev,next'

                            }}

                            //contentHeight= 'auto'
                            height="auto"
                            //contentWidth= 'auto'
                            //aspectRatio=  "1.5"
                            //      eventsSet={handleEvents}
                            allDayText="Toute la Journee"
                            rerenderDelay={10}
                            eventDurationEditable={false}
                            //    events={allEvents}
                            //selectable={true}
                            selectable={curentView === "dayGridMonth" ? false : true}
                            select={handleSelect}
                            //    drop={handleReceive}
                            //   datesSet={currentMonth}
                            //editable={true}
                            editable={curentView === "dayGridMonth" ? false : true}
                            //droppable={true}
                            droppable={curentView === "dayGridMonth" ? false : true}
                            //    eventChange={handleChange}
                            eventClick={eventClick}                        //allDayDefault={true}
                            allDaySlot={false}
                            firstDay='1'
                            slotMinTime='09:00'
                            // slotMinTime ={SeancesMinTime}
                            slotMaxTime='18:00'
                            //  slotMaxTime ={SeancesMaxTime}
                            slotLabelFormat={{
                                hour: "2-digit",
                                minute: "2-digit",
                                omitZeroMinute: false,
                                meridiem: "short"
                            }}
                            hiddenDays='0'
                            dayHeaderFormat={{ weekday: 'long', month: 'numeric', day: 'numeric', omitCommas: true }}
                            slotLabelInterval={{ hours: 1.5 }}
                            slotDuration='00:15:00'
                            eventOverlap={false}
                            defaultAllDay={false}
                            eventConstraint={[{
                                startTime: '09:00', // Heure de début de la plage bloquée
                                endTime: '13:30', // Heure de fin de la plage bloquée
                                daysOfWeek: [1, 2, 3, 4, 5], // Jours de la semaine concernés (1 = Lundi, 2 = Mardi, ..., 6 = Samedi, 0 = Dimanche)
                            },
                            {
                                startTime: '13:30',
                                endTime: '18:30',
                                daysOfWeek: [1, 2, 3, 4, 5],
                            }]}

                            businessHours={[{
                                startTime: '09:00',
                                endTime: '10:30',
                                daysOfWeek: [1, 2, 3, 4, 5],
                            }, {
                                startTime: '10:45',
                                endTime: '12:15',
                                daysOfWeek: [1, 2, 3, 4, 5],
                            },
                            {
                                startTime: '13:30',
                                endTime: '15:00',
                                daysOfWeek: [1, 2, 3, 4, 5],
                            },
                            {
                                startTime: '15:15',
                                endTime: '16:45',
                                daysOfWeek: [1, 2, 3, 4, 5],
                            }]}
                        />
                    </div>


                </div>
            </div>

            <Modal
                closeButton
                open={show}
                onClose={handleClose}
                animated={false}
                style={{ left: postion?.x - 870, top: postion?.y - 250 }}

            >
                <Modal.Header>
                    <Text id="modal-title" b size={18}>
                        Que voulez-vous faire ?
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Button bordered rounded ghost href="#" color="secondary">
                        Reduce
                    </Button>
                    <Button bordered href="#" ghost rounded color="secondary" onClick={() => {
                        setRattrapage((prevEvents) => [...prevEvents, selectedEvent]);
                        console.log(selectedEvent)
                        selectedEvent?.remove()
                        events.forEach((event) => {
                            if (event.title === selectedEvent.title) {
                                // Mettre à jour la classe CSS de l'événement pour le colorer en bleu
                                event.setProp('classNames', 'blueEvent');
                            }
                        })
                        setShow(false)
                        showInfo('Seance supprimé avec succées');
                        setEvents(calendarRef.current.getApi().getEvents())
                        setForceRender((prev) => !prev); // Inverser la valeur pour déclencher le rendu après l'ajout de l'événement

                    }
                    }>
                        Anuller Cours
                    </Button>

                    <Button bordered href="#" ghost rounded color="secondary">
                        Prévenir un enseignant par mail
                    </Button>
                    <Button bordered href="#" ghost rounded color="secondary">
                        Supprimer Cours
                    </Button>
                    <Button bordered rounded ghost color="secondary">
                        Dépositionner Cours
                    </Button>

                </Modal.Body>



                {/* {"Start Cours --- " + moment(selectedEvent?.start).format("h:mm YY/MM/DD") +
                    "End Cours --- " + moment(selectedEvent?.end).format(" h:mm YY/MM/DD") +
                    selectedEvent?._def.title + "-----" + postion?.x
                } */}
            </Modal>

            <Modal
                closeButton
                open={show2}
                onClose={handleClose}
                width="fit-content"
            >
                <Modal.Header>
                    Module :  {selectedEvent?.title}
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {semaines?.map((semaine) => {
                            const isChecked = !!findEventInCalendar(selectedEvent, semaine?.id);
                            return (
                                <div key={semaine.id} style={{ marginRight: '10px' }}>
                                    <Checkbox
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => {
                                            if (isChecked) {
                                                const foundEvent = findEventInCalendar(selectedEvent, semaine?.id);
                                                foundEvent.remove();
                                                showInfo('Seance supprimé avec succées');
                                                setEvents(calendarRef.current.getApi().getEvents());
                                            } else {
                                                console.log('clone');
                                                cloneEventToNextWeek(selectedEvent, semaine?.id);
                                            }
                                        }}
                                    />
                                    <Form.Check.Label style={{ marginLeft: '5px' }}> {semaine.id} </Form.Check.Label>
                                </div>
                            );
                        })}
                    </div>

                </Modal.Body>
            </Modal>

            <Modal
                closeButton
                open={show3}
                onClose={handleClose}
                width="900px"
            >
                <Modal.Body>
                    {/* <PickList source={events} target={target} onChange={onChange} itemTemplate={itemTemplate} filter filterBy="title"
                        sourceHeader="Enseignants Dispo:" targetHeader="Ens affectés:" sourceStyle={{ height: '40px' }} targetStyle={{ height: '40px' }}
                        sourceFilterPlaceholder="Search by name" targetFilterPlaceholder="Search by name" /> */}
                    <Grid.Container justify="center">
                        <Grid xs={4}>
                            <ListBox filter value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={servicesList} optionLabel="codeCl" className="w-full md:w-8rem" listStyle={{ height: '220px' }} placeholder="Search" />
                        </Grid>
                        <Grid xs>
                            <Button icon={<EyeIcon fill="currentColor" />} color="error" flat />

                        </Grid>
                        <Grid xs={4}>
                            <ListBox filter value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={servicesList} optionLabel="codeCl" className="w-full md:w-8rem" listStyle={{ height: '220px' }} placeholder="Search" />
                        </Grid>


                    </Grid.Container>




                </Modal.Body>

            </Modal>
        </>

    )
}

export default HandlingServiceList;