import * as React from "react";
import styled from "styled-components";

import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import "../node_modules/xterm/css/xterm.css";
import * as Content from "./content";

const StyledTerminalDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
  background: black;
  font-size: large;
`;

class ReactTerminal extends React.Component {

    commandOutput = {
        "help": Content.HELP_STRING,
        "projects": {
            "help": "help test",
            "smartwatch": "this is a test smartwatch",
        },
        "about": "asda",
        "contact": "asdas",
        "resume": "asdsad"
    };

    writelnWithDelay(term, message) {
        var strObj = {string: message};
        var intervalId = window.setInterval(() => { this.writeChar(strObj); }, /*45*/1);
        this.writeChar = (strObj) => {
            term.write(strObj.string[0]);
            strObj.string = strObj.string.substring(1);
            if (!strObj.string) {
                clearInterval(intervalId);
                term.prompt();
            }
        }
    };

    getOutputFromCommand(command) {
        const tokens = command.split(" ");
        var currDict = this.commandOutput;
        for (let idx = 0; idx < tokens.length - 1; ++idx) {
            const token = tokens[idx];
            if (token in currDict) {
                currDict = currDict[token];
                if (typeof currDict === "string") {
                    return Content.ERROR_STRING;
                }
            } else {
                if (idx !== 0 && "help" in currDict) {
                    return currDict["help"];
                } else {
                    return Content.ERROR_STRING;
                }
            }
        }
        const token = tokens[tokens.length - 1];
        if (token in currDict) {
            if (typeof currDict[token] === "string") {
                return currDict[token];
            } else {
                return currDict[token]["help"];
            }
        } else {
            return Content.ERROR_STRING;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            command: "",
            writing: false,
        };
    }

    componentDidMount() {
        const term = new Terminal({
            theme: {
                // selection: "#00FF00"
            },
            fontSize: 20,
        });
        term.prompt = () => {
            term.write("$ ");
        }
        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        // Open the terminal in #terminal-container
        term.open(document.getElementById('terminal'));

        // Make the terminal's size and geometry fit the size of #terminal-container
        fitAddon.fit();

        term.focus();

        // make terminal text color green
        term.write("\x1b[1;32m");

        this.writelnWithDelay(term, "Hello there... type `help` to get started.\r\n\r\n");

        term.onData(data => {
            if (data.charCodeAt(0) === 13) {
                // enter
                if (this.state.command) {
                    var messageOutput = this.getOutputFromCommand(this.state.command.trimRight());
                    console.log(messageOutput);
                    term.write("\r\n");
                    term.write(messageOutput);
                }
                this.setState({command: ""});
                term.write("\r\n\r\n");
                term.prompt();
            } else if (data.charCodeAt(0) === 127) {
                // backspace
                if (this.state.command) {
                    this.setState({
                        command: this.state.command.substring(0, this.state.command.length - 1)
                    });
                    term.write("\b \b");
                }
            } else {
                this.setState({command: this.state.command + data});
                term.write(data);
            }
        });
    }

    render() {
        return (
            <div>
                <script src="../node_modules/xterm/lib/xterm.js"></script>
                <StyledTerminalDiv id="terminal">
                </StyledTerminalDiv>
            </div>
        )
    }
}

export default ReactTerminal
