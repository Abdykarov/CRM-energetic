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
                                    <h2>P??IHL????KA (UCHAZE??E O P??IJET??) ZA ??LENA <br/>
                                        Energetick?? dru??stvo vlastn??k?? fotovoltaick??ch elektr??ren</h2>
                                    <h4>I??O: 09921192, se s??dlem Blanick?? 922/25, Vinohrady, 120 00 Praha 2 <br/>
                                        (d??le tak?? jen ???Dru??stvo???)</h4>
                                </div>
                                <div className="row">
                                    <h5>1. IDENTIFIKA??N?? ??DAJE</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>Fyzick?? osoba: jm??no:</p>
                                        </div>
                                        <div className="col-md-6">
                                            <input value={invite.name} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>Fyzick?? osoba: p????jmen??:</p>
                                        </div>
                                        <div className="col-md-6">
                                            <input value={invite.surname} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>Fyzick?? osoba: titul:</p>
                                        </div>
                                        <div className="col-md-6">
                                            <input value={invite.titul} readOnly className="gray_input" type="text"/>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>Pr??vnick?? osoba:  n??zev firmy:</p>
                                        </div>
                                        <div className="col-md-6">
                                            <input value={invite.firmName} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>Pr??vnick?? osoba: zastoupen?? k??m:</p>
                                        </div>
                                        <div className="col-md-6">
                                            <input value={invite.firmLeader} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <br/><br/><br/><br/><br/>
                                    <p>Bydli??t?? u fyzick??ch osob / s??dlo u pr??vnick??ch osob:</p>
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
                                            <p>PS??:</p>
                                        </div>
                                        <div className="col-md-4">
                                            <input value={invite.psc} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>Rodn?? ????slo (pouze FO nepodnikatel):</p>
                                        </div>
                                        <div className="col-md-4">
                                            <input value={invite.rc} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>I??O (pouze PO nebo FO podnikatel):</p>
                                        </div>
                                        <div className="col-md-4">
                                            <input value={invite.ico} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>DI?? u pl??tce DPH:</p>
                                        </div>
                                        <div className="col-md-4">
                                            <input value={invite.dic} readOnly className="gray_input" type="text"/>
                                        </div>
                                    </div>
                                    <h5>2. KONTAKTN?? ??DAJE</h5>
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
                                    <h5>3. Z??KLADN?? ??LENSK?? VKLAD:</h5>
                                    <p>Z??kladn?? ??? pen????it?? ??lensk?? vklad ??in?? 5,- K?? [slovy: p??t korun ??esk??ch].</p>
                                    <h5>4. IDENTIFIKACE FOTOVOLTAICK?? ELEKTR??RNY</h5>
                                    <p>M??sto/m??sta fotovoltaick??/fotovoltaick??ch elektr??rny/elektr??ren, kterou/kter?? m?? uchaze??
                                        ve sv??m vlastnictv??/na kterou m?? sjednanou smlouvu na budouc?? fotovoltaickou elektr??rnu
                                        ve smyslu ??l. 5 odst. 1 p??sm. a) stanov Dru??stva:</p>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>
                                                <p>Ulice/Popis m??sta Obec PS??</p>
                                            </th>
                                            <th>
                                                <p>Obec</p>
                                            </th>
                                            <th><p>PS??</p></th>
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
                                    <h5>5. KAPACITA FOTOVOLTAICK?? ELEKTR??RNY</h5>
                                    <p>Kapacita/kapacity fotovoltaick??/fotovoltaick??ch elektr??rny/elektr??ren, kterou/kter?? m??
                                        uchaze?? ve sv??m vlastnictv??/na kterou m?? sjednanou smlouvu na budouc?? fotovoltaickou
                                        elektr??rnu ve smyslu ??l. 5 odst. 1 p??sm. a) stanov Dru??stva:</p>
                                    <input value={invite.fveCapacity} readOnly className="gray_input" type="text"/>
                                    <h5>6. KAPACITA BATERIOV??HO ??LO??I??T?? <sup>1</sup></h5>
                                    <input value={invite.batteryCapacity} readOnly className="gray_input" type="text"/>
                                    <br/><br/><br/><br/><br/>
                                    <p>J??, n????e podepsan??(??), pod??v??m tuto p??ihl????ku za ??lena Energetick??ho dru??stva vlastn??k??
                                        fotovoltaick??ch elektr??ren a prohla??uji, ??e:
                                    </p>
                                    <p>??? jsem se sezn??mil(a) se stanovami Dru??stva, s podm??nkami vzniku ??lenstv?? a zejm??na s pr??vy
                                        a povinnostmi ??lena dru??stva, jejich?? ????ste??n?? v????et je uveden na rubov?? stran?? t??to p??ihl????ky,</p>
                                    <p>                                        ???beru na v??dom??, ??e budou zpracov??ny osobn?? ??daje zadan?? v t??to p??ihl????ce,
                                    </p>
                                    <p>???beru na v??dom?? mo??nost z??sk??v??n?? informac?? t??kaj??c??ch se Dru??stva a jeho ??len?? (webov??
                                        str??nky www.energetickedruzstvo.cz),
                                    </p>
                                    <p>??? spl??uji podm??nky pro ??lenstv?? v Dru??stvu,
                                    </p>
                                    <p>???p??eb??r??m vkladovou povinnost k z??kladn??mu ??lensk??mu vkladu ve v????i 5,- K?? [slovy: p??t korun
                                        ??esk??ch]
                                    </p>
                                    <p>??? se zavazuji v??dy jednat v souladu se stanovami Dru??stva.</p>
                                    <div className="invite-button">
                                    </div>
                                    <h5>V??pis ze stanov dru??stva</h5>
                                    <p>1. ??lenem dru??stva m????e b??t zletil?? fyzick?? osoba nebo pr??vnick?? osoba, kter?? spl??uje
                                        n??sleduj??c?? podm??nky (kumulativn??):</p>
                                    <p>a) m?? ve sv??m v??lu??n??m vlastnictv?? fotovoltaickou elektr??rnu p??ipojenou do elektrick?? distribu??n??
                                        s??t?? (d??le tak?? jen ???p??ipojen?? fotovoltaick?? elektr??rna???) a/nebo m?? uzav??enou platnou a ????innou
                                        smlouvu o v??stavb?? fotovoltaick?? elektr??rny (d??le tak?? jen ???budouc?? fotovoltaick?? elektr??rna???)
                                        (p??ipojen?? fotovoltaick?? elektr??rna a budouc?? fotovoltaick?? elektr??rna d??le tak?? jen spole??n??
                                        ???fotovoltaick?? elektr??rna???);</p>
                                    <p>b) m?? sjednanou platnou a ????innou smlouvu o dod??vk??ch a v??kupu elektrick?? energie
                                        se spole??nosti Sysel Energie a.s., I??O: 09293507;</p>
                                    <p>c) je vlastn??kem za????zen??, kter?? umo????uje monitorovat a ????dit p??ipojenou fotovoltaickou elektr??rnu
                                        nebo mu mus?? b??t takov?? za????zen?? dod??no v r??mci budouc?? fotovoltaick?? elektr??rny (d??le tak?? jen
                                        ???????d??c?? za????zen?????) a sou??asn?? mus?? ud??lit k ????d??c??mu za????zen?? p????stup spole??nosti Sun Monitor s.r.o.,
                                        I??O: 09511831 nebo jin?? spole??nosti ur??en?? dru??stvem.</p>
                                    <p>2. ??len dru??stva m????e poskytnout kapacitu bateriov??ho ??lo??i??t??, kter?? souvis?? s jeho
                                        fotovoltaickou elektr??rnou, p??i??em?? s poskytnut??m bateriov??ho ??lo??i??t?? mohou b??t spojena pr??va
                                        dan?? t??mito stanovami a/nebo dru??stvem.</p>
                                    <p>??lenstv?? v dru??stvu vznik?? p??ijet??m za ??lena na z??klad?? ??lensk?? p??ihl????ky</p>
                                    <p>O p??ijet?? za ??lena dru??stva na z??klad?? p??semn?? ??lensk?? p??ihl????ky po p??edchoz??m slo??en?? z??kladn??ho
                                        ??lensk??ho vkladu ve v????i 5,- K?? (??l. 3 odst. 2 stanov dru??stva), rozhoduje p??edstavenstvo dru??stva.
                                        Obsah ??lensk?? p??ihl????ky upravuj?? pr??vn?? p??edpisy a stanovy dru??stva. P??ihl????ka mus?? obsahovat
                                        i prohl????en?? ??adatele o spln??n?? podm??nek pro vznik ??lenstv?? uveden??ch ve stanov??ch. ??lenstv??
                                        v dru??stvu vznik?? dnem rozhodnut?? p??edstavenstva dru??stva o p??ijet?? za ??lena.</p>
                                    <h5>??len dru??stva m?? pr??vo zejm??na:</h5>
                                    <p>a) ????astnit se osobn?? nebo v zastoupen?? ??lensk?? sch??ze dru??stva,</p>
                                    <p>b) ????astnit se ????zen?? a rozhodov??n?? v dru??stvu,</p>
                                    <p>c) b??t volen do volen??ch org??n?? dru??stva,</p>
                                    <p>d) ????astnit se ve??ker?? ??innosti dru??stva, pod??let se na v??hod??ch a pln??n??ch poskytovan??ch
                                        dru??stvem sv??m ??len??m,</p>
                                    <p>e) p??edkl??dat n??vrhy na zlep??en?? ??innosti dru??stva, obracet se s podn??ty, p??ipom??nkami nebo
                                        sti??nostmi, t??kaj??c??mi se ??innosti dru??stva a b??t o jejich vy????zen?? informov??n.</p>
                                    <p>f) pod??let se na zisku z podnikatelsk?? ??innost??</p>
                                    <p>g) na vypo????dac?? pod??l v p????pad?? z??niku jeho ??lenstv??, jeho?? v????e se ur???? na z??klad?? p????slu??n??ho
                                        ustanoven?? t??chto stanov</p>
                                    <p>h) nahl????et do seznamu ??len?? dru??stva a dal???? pr??va vztahuj??c?? se k seznamu ??len?? dru??stva
                                        uveden?? v????e v t??chto stanov??ch,</p>
                                    <p>i) na vyd??n?? kopie z??pisu o pr??b??hu ??lensk?? sch??ze v??etn?? p????loh a podklad?? za ??hradu ????eln??
                                        vynalo??en??ch n??klad?? spojen??ch s po????zen??m t??chto kopi??.</p>
                                    <h5>2. ??len dru??stva je povinen zejm??na:</h5>
                                    <p>a) dodr??ovat p????slu??n?? pr??vn?? p??edpisy, tyto stanovy a z??vazn?? usnesen?? org??n?? dru??stva,</p>
                                    <p>b) ozn??mit a dolo??it dru??stvu ka??dou zm??nu ??daj??, kter?? se zapisuj?? do seznamu ??len??
                                        bez zbyte??n??ho odkladu pot??, co tato skute??nost nastala,</p>
                                    <p>c) na z??klad?? rozhodnut?? ??lensk?? sch??ze p??isp??t na ??hradu ztr??ty dru??stva (d??le jen jako
                                        ???uhrazovac?? povinnost???) s t??m, ??e v????e uhrazovac?? povinnosti ur???? ??lensk?? sch??ze pro jednotliv??
                                        ??leny dru??stva ve stejn?? v????i a uhrazovac?? povinnost jednotliv??ho ??lena dru??stva nesm??
                                        p??es??hnout trojn??sobek z??kladn??ho ??lensk??ho vkladu; uhrazovac?? povinnost nesm?? b??t ulo??ena
                                        tak, aby jej?? souhrn p??evy??oval skute??nou ztr??tu dru??stva s t??m, ??e tuto ztr??tu je mo??n?? vy????slit
                                        jen na z??klad?? ????dn?? nebo mimo????dn?? ????etn?? z??v??rky, kter?? byla projedn??na ??lenskou sch??z??,
                                        a k ??hrad?? ztr??ty byly p??ednostn?? pou??ity finan??n?? prost??edky z nerozd??len??ho zisku z minul??ch
                                        let, z ned??liteln??ho fondu, pop??. z jin??ho fondu z????zen??ho dru??stvem, ze kter??ho by bylo mo??n??
                                        za t??mto ????elem pou????t finan??n?? prost??edky; ??lensk?? sch??ze m????e rozhodnout o ulo??en??
                                        uhrazovac?? povinnosti nejpozd??ji do jednoho roku ode dne skon??en?? ????etn??ho obdob??, v n??m??
                                        ztr??ta, na jej???? ??hradu se o uhrazovac?? povinnost vztahuje, vznikla.</p>
                                    <p>??pln?? zn??n?? stanov je k dispozici na <a href="https://www.energetickedruzstvo.cz">www.energetickedruzstvo.cz</a>, sekce Dokumenty.</p>
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