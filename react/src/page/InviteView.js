import React, {useContext, useEffect, useState} from 'react';
import {CONTACT_PROFILE_ROUTE, DASHBOARD_ROUTE, LOGIN_ROUTE} from "../utils/const";
import {useHistory, useParams} from "react-router-dom";
import {edrRegistrate, login} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getFilteredFactures} from "../http/factureAPI";
import {fetchInvite, inviteActivate} from "../http/inviteAPI";
import {fetchEdr} from "../http/contactAPI";

const InviteView = observer(() => {
    const history = useHistory()
    const {uniqueCode} = useParams()
    const {user} = useContext(Context)
    const [invite, setInvite] = useState('')


    useEffect(() => {
        fetchInvite(uniqueCode).then(data => {
            setInvite(data)
            console.log(data)
        })
    }, [])

    return (
        <div>
            {
                user.isAuth  ?
                    <div className="edr_create">
                        <header>
                            <div className="navbar-custom">
                                <div className="container-fluid">

                                    <div className="logo-box">
                                        <a href="index.html" className="logo logo-dark text-center">
                <span className="logo-sm">
                    <img src="/images/logo-sm.png" alt="" height="22"/>

                </span>
                                            <span className="logo-lg">
                    <img src="/images/logo-dark.png" alt="" height="20"/>
                </span>
                                        </a>

                                        <a href="/" className="logo logo-light text-center">
                <span className="logo-sm">
                    <img src="/images/logo-sm.png" alt="" height="22"/>
                </span>
                                            <span className="logo-lg">
                    <img src="/images/logoEDR.png" alt="" width={200}/>
                </span>
                                        </a>
                                    </div>

                                    <div className="clearfix"></div>
                                </div>
                            </div>

                        </header>
                        <div className="invite_main">
                            <div className="invite-wrapper">
                                <div className="invite-top">
                                    <h2>PŘIHLÁŠKA (UCHAZEČE O PŘIJETÍ) ZA ČLENA <br/>
                                        Energetické družstvo vlastníků fotovoltaických elektráren</h2>
                                    <h4>IČO: 09921192, se sídlem Blanická 922/25, Vinohrady, 120 00 Praha 2 <br/>
                                        (dále také jen „Družstvo“)</h4>
                                </div>
                                <div className="row">
                                    <h5>1. IDENTIFIKAČNÍ ÚDAJE</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>Fyzická osoba: jméno:</p>
                                        </div>
                                        <div className="col-md-6">
                                            <input value={invite.name} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>Fyzická osoba: příjmení:</p>
                                        </div>
                                        <div className="col-md-6">
                                            <input value={invite.surname} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>Fyzická osoba: titul:</p>
                                        </div>
                                        <div className="col-md-6">
                                            <input value={invite.titul} readOnly className="gray_input" type="text"/>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>Právnická osoba:  název firmy:</p>
                                        </div>
                                        <div className="col-md-6">
                                            <input value={invite.firmName} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>Právnická osoba: zastoupená kým:</p>
                                        </div>
                                        <div className="col-md-6">
                                            <input value={invite.firmLeader} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <br/><br/><br/><br/><br/>
                                    <p>Bydliště u fyzických osob / sídlo u právnických osob:</p>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <p>Ulice:</p>
                                        </div>
                                        <div className="col-md-9">
                                            <input value={invite.street} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <p>Obec:</p>
                                        </div>
                                        <div className="col-md-9">
                                            <input value={invite.area} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <p>PSČ:</p>
                                        </div>
                                        <div className="col-md-4">
                                            <input value={invite.psc} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>Rodné číslo (pouze FO nepodnikatel):</p>
                                        </div>
                                        <div className="col-md-4">
                                            <input value={invite.rc} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>IČO (pouze PO nebo FO podnikatel):</p>
                                        </div>
                                        <div className="col-md-4">
                                            <input value={invite.ico} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>DIČ u plátce DPH:</p>
                                        </div>
                                        <div className="col-md-4">
                                            <input value={invite.dic} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <h5>2. KONTAKTNÍ ÚDAJE</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>Telefon <br/><br/>
                                                <input value={invite.phone} readOnly className="gray_input" type="text"/>
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Email: <br/><br/>
                                                <input value={invite.email} readOnly className="gray_input" type="text"/>
                                            </p>                                        </div>
                                    </div>
                                    <h5>3. ZÁKLADNÍ ČLENSKÝ VKLAD:</h5>
                                    <p>Základní – peněžitý členský vklad činí 5,- Kč [slovy: pět korun českých].</p>
                                    <h5>4. IDENTIFIKACE FOTOVOLTAICKÉ ELEKTRÁRNY</h5>
                                    <p>Místo/místa fotovoltaické/fotovoltaických elektrárny/elektráren, kterou/které má uchazeč
                                        ve svém vlastnictví/na kterou má sjednanou smlouvu na budoucí fotovoltaickou elektrárnu
                                        ve smyslu čl. 5 odst. 1 písm. a) stanov Družstva:</p>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>
                                                <p>Ulice/Popis místa Obec PSČ</p>
                                            </th>
                                            <th>
                                                <p>Obec</p>
                                            </th>
                                            <th><p>PSČ</p></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <input value={invite.fveStreet1} readOnly className="gray_input" type="text"/>
                                            </td>
                                            <td>
                                                <input value={invite.fveArea1} readOnly className="gray_input" type="text"/>
                                            </td>
                                            <td>
                                                <input value={invite.fvePsc1} readOnly className="gray_input" type="text"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input value={invite.fveStreet2} readOnly className="gray_input" type="text"/>
                                            </td>
                                            <td>
                                                <input value={invite.fveArea2} readOnly className="gray_input" type="text"/>
                                            </td>
                                            <td>
                                                <input value={invite.fvePsc2} readOnly className="gray_input" type="text"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input value={invite.fveStreet3} readOnly className="gray_input" type="text"/>
                                            </td>
                                            <td>
                                                <input value={invite.fveArea3} readOnly className="gray_input" type="text"/>
                                            </td>
                                            <td>
                                                <input value={invite.fvePsc3} readOnly className="gray_input" type="text"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input value={invite.fveStreet4} readOnly className="gray_input" type="text"/>
                                            </td>
                                            <td>
                                                <input value={invite.fveArea4} readOnly className="gray_input" type="text"/>
                                            </td>
                                            <td>
                                                <input value={invite.fvePsc4} readOnly className="gray_input" type="text"/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <h5>5. KAPACITA FOTOVOLTAICKÉ ELEKTRÁRNY</h5>
                                    <p>Kapacita/kapacity fotovoltaické/fotovoltaických elektrárny/elektráren, kterou/které má
                                        uchazeč ve svém vlastnictví/na kterou má sjednanou smlouvu na budoucí fotovoltaickou
                                        elektrárnu ve smyslu čl. 5 odst. 1 písm. a) stanov Družstva:</p>
                                    <input value={invite.fveCapacity} readOnly className="gray_input" type="text"/>
                                    <h5>6. KAPACITA BATERIOVÉHO ÚLOŽIŠTĚ <sup>1</sup></h5>
                                    <input value={invite.batteryCapacity} readOnly className="gray_input" type="text"/>
                                    <br/><br/><br/><br/><br/>
                                    <p>Já, níže podepsaný(á), podávám tuto přihlášku za člena Energetického družstva vlastníků
                                        fotovoltaických elektráren a prohlašuji, že:
                                    </p>
                                    <p>• jsem se seznámil(a) se stanovami Družstva, s podmínkami vzniku členství a zejména s právy
                                        a povinnostmi člena družstva, jejichž částečný výčet je uveden na rubové straně této přihlášky,</p>
                                    <p>                                        •beru na vědomí, že budou zpracovány osobní údaje zadané v této přihlášce,
                                    </p>
                                    <p>•beru na vědomí možnost získávání informací týkajících se Družstva a jeho členů (webové
                                        stránky www.energetickedruzstvo.cz),
                                    </p>
                                    <p>• splňuji podmínky pro členství v Družstvu,
                                    </p>
                                    <p>•přebírám vkladovou povinnost k základnímu členskému vkladu ve výši 5,- Kč [slovy: pět korun
                                        českých]
                                    </p>
                                    <p>• se zavazuji vždy jednat v souladu se stanovami Družstva.</p>
                                    <div className="invite-button">
                                    </div>
                                    <h5>Výpis ze stanov družstva</h5>
                                    <p>1. Členem družstva může být zletilá fyzická osoba nebo právnická osoba, která splňuje
                                        následující podmínky (kumulativně):</p>
                                    <p>a) má ve svém výlučném vlastnictví fotovoltaickou elektrárnu připojenou do elektrické distribuční
                                        sítě (dále také jen „připojená fotovoltaická elektrárna“) a/nebo má uzavřenou platnou a účinnou
                                        smlouvu o výstavbě fotovoltaické elektrárny (dále také jen „budoucí fotovoltaická elektrárna“)
                                        (připojená fotovoltaická elektrárna a budoucí fotovoltaická elektrárna dále také jen společně
                                        „fotovoltaická elektrárna“);</p>
                                    <p>b) má sjednanou platnou a účinnou smlouvu o dodávkách a výkupu elektrické energie
                                        se společnosti Sysel Energie a.s., IČO: 09293507;</p>
                                    <p>c) je vlastníkem zařízení, které umožňuje monitorovat a řídit připojenou fotovoltaickou elektrárnu
                                        nebo mu musí být takové zařízení dodáno v rámci budoucí fotovoltaické elektrárny (dále také jen
                                        „Řídící zařízení“) a současně musí udělit k Řídícímu zařízení přístup společnosti Sun Monitor s.r.o.,
                                        IČO: 09511831 nebo jiné společnosti určené družstvem.</p>
                                    <p>2. Člen družstva může poskytnout kapacitu bateriového úložiště, které souvisí s jeho
                                        fotovoltaickou elektrárnou, přičemž s poskytnutím bateriového úložiště mohou být spojena práva
                                        daná těmito stanovami a/nebo družstvem.</p>
                                    <p>Členství v družstvu vzniká přijetím za člena na základě členské přihlášky</p>
                                    <p>O přijetí za člena družstva na základě písemné členské přihlášky po předchozím složení základního
                                        členského vkladu ve výši 5,- Kč (čl. 3 odst. 2 stanov družstva), rozhoduje představenstvo družstva.
                                        Obsah členské přihlášky upravují právní předpisy a stanovy družstva. Přihláška musí obsahovat
                                        i prohlášení žadatele o splnění podmínek pro vznik členství uvedených ve stanovách. Členství
                                        v družstvu vzniká dnem rozhodnutí představenstva družstva o přijetí za člena.</p>
                                    <h5>Člen družstva má právo zejména:</h5>
                                    <p>a) účastnit se osobně nebo v zastoupení členské schůze družstva,</p>
                                    <p>b) účastnit se řízení a rozhodování v družstvu,</p>
                                    <p>c) být volen do volených orgánů družstva,</p>
                                    <p>d) účastnit se veškeré činnosti družstva, podílet se na výhodách a plněních poskytovaných
                                        družstvem svým členům,</p>
                                    <p>e) předkládat návrhy na zlepšení činnosti družstva, obracet se s podněty, připomínkami nebo
                                        stižnostmi, týkajícími se činnosti družstva a být o jejich vyřízení informován.</p>
                                    <p>f) podílet se na zisku z podnikatelské činností</p>
                                    <p>g) na vypořádací podíl v případě zániku jeho členství, jehož výše se určí na základě příslušného
                                        ustanovení těchto stanov</p>
                                    <p>h) nahlížet do seznamu členů družstva a další práva vztahující se k seznamu členů družstva
                                        uvedená výše v těchto stanovách,</p>
                                    <p>i) na vydání kopie zápisu o průběhu členské schůze včetně příloh a podkladů za úhradu účelně
                                        vynaložených nákladů spojených s pořízením těchto kopií.</p>
                                    <h5>2. Člen družstva je povinen zejména:</h5>
                                    <p>a) dodržovat příslušné právní předpisy, tyto stanovy a závazná usnesení orgánů družstva,</p>
                                    <p>b) oznámit a doložit družstvu každou změnu údajů, které se zapisují do seznamu členů
                                        bez zbytečného odkladu poté, co tato skutečnost nastala,</p>
                                    <p>c) na základě rozhodnutí členské schůze přispět na úhradu ztráty družstva (dále jen jako
                                        „uhrazovací povinnost“) s tím, že výše uhrazovací povinnosti určí členská schůze pro jednotlivé
                                        členy družstva ve stejné výši a uhrazovací povinnost jednotlivého člena družstva nesmí
                                        přesáhnout trojnásobek základního členského vkladu; uhrazovací povinnost nesmí být uložena
                                        tak, aby její souhrn převyšoval skutečnou ztrátu družstva s tím, že tuto ztrátu je možné vyčíslit
                                        jen na základě řádné nebo mimořádné účetní závěrky, která byla projednána členskou schůzí,
                                        a k úhradě ztráty byly přednostně použity finanční prostředky z nerozděleného zisku z minulých
                                        let, z nedělitelného fondu, popř. z jiného fondu zřízeného družstvem, ze kterého by bylo možné
                                        za tímto účelem použít finanční prostředky; členská schůze může rozhodnout o uložení
                                        uhrazovací povinnosti nejpozději do jednoho roku ode dne skončení účetního období, v němž
                                        ztráta, na jejíž úhradu se o uhrazovací povinnost vztahuje, vznikla.</p>
                                    <p>Úplné znění stanov je k dispozici na <a href="https://www.energetickedruzstvo.cz">www.energetickedruzstvo.cz</a>, sekce Dokumenty.</p>
                                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                </div>
                            </div>
                        </div>
                    </div>

                    : ""
            }

        </div>

    );
});

export default InviteView;