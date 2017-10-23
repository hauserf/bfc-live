export const AppLang = {
  menu: {
    manager: {
      englishUS: "Manager View",
      german: "Manager"
    },
    fan: {
      englishUS: "Fan View",
      german: "Fan"
    }
  },
  views: {
    welcome: {
      accessText: {
        englishUS: "Access as",
        german: "App nutzen als"
      },
      accessBtn: {
        manager: {
          englishUS: "Manager",
          german: "Manager"
        },
        player: {
          englishUS: "Player",
          german: "Spieler"
        }
      },
      pitch: {
        englishUS: "One click live stats, social updates and game reports for clubs and leagues. Powered by",
        german: "Live-Statistiken, Social Media Posts and Spielberichte für Vereine und Ligen mit nur einem Klick"
      }

    },
    start: {
      teamCode: {
        englishUS: "Enter Team Code",
        german: "Mannschafts-Code eingeben"
      }

    },
    roster: {
      titles: {
        startingPlayers: {
          englishUS: "Starting Players ",
          german: "Startaufstellung "
        },
        currentlyPlaying: {
          englishUS: "Currently Playing ",
          german: "Momentan auf dem Feld "
        },
        availableRoster: {
          englishUS: "Available Roster ",
          german: "Im Kader "
        },
        subs: {
          englishUS: "Subs ",
          german: "Wechselspieler "
        }
      },
      hints: {
        selectPlayers: {
          englishUS: 'Select players from "Available Roster" to track playing time and record goals and assists.',
          german: 'Wähle Spieler von "Im Kader", um Tore, Vorlagen und gespielte Minuten zu erfassen.'
        }
      },
      twitterActivation: {
        activate: {
          alert: {
            englishUS: "Automatic twitter updates are turned off by default. Click 'ACTIVATE' to activate updates using the club's official Twitter account @BFCNY.",
            german: "Automatische Twitter-Updates sind momentan nicht aktiviert. Klicke 'AKTIVIEREN', um Twitter updates über das Twitterkonto des Vereins zu aktivieren."
          },
          btn: {
            englishUS: "ACTIVATE",
            german: "AKTIVIEREN"
          }
        },
        deactivate: {
          alert: {
            englishUS: "Automatic twitter updates are currently turned on. Click 'DEACTIVATE' to deactivate twitter updates.",
            german: "Automatische Twitter-Updates sind aktiviert. Klicke 'DEAKTIVIEREN', um Twitter updates über das Twitterkonto des Vereins zu deaktivieren."
          },
          btn: {
            englishUS: "DEACTIVATE",
            german: "DEAKTIVIEREN"
          }
        }
      }
    },
    bfcLive: {

    },
    gameEnded: {
      gameEnded: {
        englishUS: "Game ended",
        german: "Das Spiel is zu Ende"
      },
      error: {
        englishUS: "Game report cannot be processed",
        german: "Der Spielbericht konnte nicht generiert werden"
      }
      // sentimentBox: {
      //   q:  (gameOutcome) => {
      //
      //     const qVersions = {
      //       {gameOutcome}: {
      //         englishUS: `What do you think of the ${gameOutcome}?`,
      //         german: ""
      //       },
      //     }
      //   }
      // }
    }
  },
  timerEvents: [
    {
      key: 1000,
      btnName: {
        englishUS: "Start Game",
        german: "Starte das Spiel"
      },
      timerEvent: {
        englishUS: "Waiting for Kickoff",
        german: "Wir warten auf den Anpfiff"
      }
    },
    {
      key: 1001,
      btnName: {
        englishUS: "End 1st Half",
        german: "Halbzeit"
      },
      timerEvent: {
        englishUS: "Game On!",
        german: "Das Spiel beginnt!"
      }
    },
    {
      key: 1002,
      btnName: {
        englishUS: "Start 2nd Half",
        german: "Starte 2. Halbzeit"
      },
      timerEvent: {
        englishUS: "First Half Ended",
        german: "Die erste Halbzeit endet"
      }
    },
    {
      key: 1003,
      btnName: {
        englishUS: "End 2nd Half",
        german: "Abpfiff"
      },
      timerEvent: {
        englishUS: "Second Half Begins",
        german: "Die zweite Halbzeit beginnt"
      }
    },
    {
      key: 1004,
      btnName: {
        englishUS: "Game Ended",
        german: "Das Spiel hat geendet"
      },
      timerEvent: {
        englishUS: "Second Half Ended",
        german: "Die zweite Halbzeit endet"
      }
    },
  ]
}
