import "./App.css";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";

const axios = require("axios");
const circularJSON = require("circular-json");

function App() {
    const [isLoading, setLoading] = useState(true);
    const [latest, setLatest] = useState("");

    useEffect(() => {
        axios
            .get("https://api.covid19india.org/state_district_wise.json")
            .then((res) => {
                setLatest(res.data);
                setLoading(false);
            });
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    var size = 4;

    var districts = ["Rudraprayag", "Dehradun", "Almora", "Bageshwar"];

    var utt_data = [];

    for (var i = 0; i < size; i++) {
        var cur = latest.Uttarakhand.districtData[districts[i]];
        cur.name = "Uttarakhand " + districts[i];
        utt_data[i] = cur;
    }

    districts = ["Bagalkote", "Ballari", "Belagavi", "Chitradurga"];

    var kar_data = [];

    for (var i = 0; i < size; i++) {
        var cur = latest.Karnataka.districtData[districts[i]];
        cur.name = "Karnataka " + districts[i];
        kar_data[i] = cur;
    }

    console.log(utt_data);
    console.log(kar_data);

    return (
        <div>
            <CardDeck style={{ margin: "10px" }}>
                {utt_data.map((district) => (
                    <Card bg="light" text="black" style={{ margin: "10px" }}>
                        <Card.Body>
                            <Card.Title className="text-center">
                                {district.name}
                            </Card.Title>
                            <Card.Text style={{ color: "blue" }}>
                                Active: {district.active}
                            </Card.Text>
                            <Card.Text style={{ color: "black" }}>
                                Confirmed: {district.confirmed}
                            </Card.Text>
                            <Card.Text style={{ color: "red" }}>
                                Deceased: {district.deceased}
                            </Card.Text>
                            <Card.Text style={{ color: "green" }}>
                                Recovered: {district.recovered}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </CardDeck>

            <CardDeck style={{ margin: "10px" }}>
                {kar_data.map((district) => (
                    <Card bg="light" text="black" style={{ margin: "10px" }}>
                        <Card.Body>
                            <Card.Title className="text-center">
                                {district.name}
                            </Card.Title>
                            <Card.Text style={{ color: "blue" }}>
                                Active: {district.active}
                            </Card.Text>
                            <Card.Text style={{ color: "black" }}>
                                Confirmed: {district.confirmed}
                            </Card.Text>
                            <Card.Text style={{ color: "red" }}>
                                Deceased: {district.deceased}
                            </Card.Text>
                            <Card.Text style={{ color: "green" }}>
                                Recovered: {district.recovered}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </CardDeck>
        </div>
    );
}

export default App;
