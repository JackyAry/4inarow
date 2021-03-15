namespace SpriteKind {
    export const AuswahlPfeil = SpriteKind.create()
    export const AuaswahlPfeil1 = SpriteKind.create()
    export const AuswahlPfeil2 = SpriteKind.create()
    export const SpielStein1 = SpriteKind.create()
    export const SpielStein2 = SpriteKind.create()
    export const SpielStein = SpriteKind.create()
}
function checkGewonnen () {
    if (aktuellerSpieler == Spieler1Pfeil) {
        PrüfeAuf = 1
    } else {
        PrüfeAuf = 2
    }
    CheckUnten()
    checkReihe()
    checkDiagonalLR()
    checkDiagonalRL()
}
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (aktuelleSpalte.length < 7) {
        if (aktuellerSpieler == Spieler1Pfeil) {
            aktuelleSpalte.push(1)
            checkGewonnen()
            aktuellerSpieler = Spieler2Pfeil
            Spieler2Pfeil.setFlag(SpriteFlag.Invisible, false)
            Spieler1Pfeil.setFlag(SpriteFlag.Invisible, true)
            aktuellerSpielStein = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 . . . . . . 
                . . . . 6 6 6 5 5 6 6 6 . . . . 
                . . . 7 7 7 7 6 6 6 6 6 6 . . . 
                . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
                . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
                . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
                . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
                . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
                . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
                . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
                . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
                . . . 6 8 8 8 8 8 8 8 8 6 . . . 
                . . . . 6 6 8 8 8 8 6 6 . . . . 
                . . . . . . 6 6 6 6 . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.SpielStein)
            OutputText = "Spieler 2 ist dran!"
        } else {
            aktuelleSpalte.push(2)
            checkGewonnen()
            aktuellerSpieler = Spieler1Pfeil
            Spieler1Pfeil.setFlag(SpriteFlag.Invisible, false)
            Spieler2Pfeil.setFlag(SpriteFlag.Invisible, true)
            OutputText = "Spieler 1 ist dran!"
            aktuellerSpielStein = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . 4 4 4 5 5 4 4 4 . . . . 
                . . . 3 3 3 3 4 4 4 4 4 4 . . . 
                . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
                . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
                . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
                . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
                . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
                . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
                . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
                . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
                . . . 4 2 2 2 2 2 2 2 2 4 . . . 
                . . . . 4 4 2 2 2 2 4 4 . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.SpielStein)
        }
        aktuellerSpieler.say(OutputText, 2000)
        zeichnePlayerPfeil(aktuellerSpieler)
        aktuelleSpalte = Feld[aktuelleSpielerPosition]
    } else {
        aktuellerSpieler.say("Spalte voll!", 500)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (aktuelleSpielerPosition > 0) {
        aktuelleSpielerPosition += -1
        zeichnePlayerPfeil(aktuellerSpieler)
    }
})
function CheckUnten () {
    Reihe = 0
    SpielerHoehe = aktuelleSpalte.length - 1
    for (let index = 0; index <= 3; index++) {
        if (index != 0) {
            if (aktuelleSpalte[SpielerHoehe - index] == PrüfeAuf) {
                Reihe += 1
            }
        }
    }
    Gewonnen()
}
function Gewonnen () {
    if (Reihe == 3) {
        game.over(true, effects.confetti)
    }
}
function checkDiagonalRL () {
    Reihe = 0
    SpielerHoehe = aktuelleSpalte.length - 1
    for (let index = 0; index <= 3; index++) {
        if (index != 0) {
            if (index != 0) {
                if (aktuelleSpielerPosition - index >= 0) {
                    list = Feld[aktuelleSpielerPosition - index]
                    if (list[SpielerHoehe - index] == PrüfeAuf) {
                        Reihe += 1
                    } else {
                        break;
                    }
                }
            }
        }
    }
    SpielerHoehe = aktuelleSpalte.length - 1
    for (let index = 0; index <= 3; index++) {
        if (index != 0) {
            if (index != 0) {
                if (aktuelleSpielerPosition + index <= 6) {
                    list = Feld[aktuelleSpielerPosition + index]
                    if (list[SpielerHoehe + index] == PrüfeAuf) {
                        Reihe += 1
                    } else {
                        break;
                    }
                }
            }
        }
    }
    Gewonnen()
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (aktuelleSpielerPosition < 6) {
        aktuelleSpielerPosition += 1
        zeichnePlayerPfeil(aktuellerSpieler)
    }
})
function zeichnePlayerPfeil (mySprite: Sprite) {
    aktuelleSpalte = Feld[aktuelleSpielerPosition]
    grid.place(aktuellerSpieler, tiles.getTileLocation(aktuelleSpielerPosition, 0))
    aktuellerSpieler.x += 2
    aktuellerSpieler.y += 2
    aktuellerSpieler.z += 1
    grid.place(aktuellerSpielStein, tiles.getTileLocation(aktuelleSpielerPosition, 7 - aktuelleSpalte.length))
    aktuellerSpielStein.x += 1
    aktuellerSpielStein.y += 1
}
function checkReihe () {
    Reihe = 0
    for (let index = 0; index <= 3; index++) {
        if (index != 0) {
            if (aktuelleSpielerPosition + index <= 6) {
                list = Feld[aktuelleSpielerPosition + index]
                if (list[SpielerHoehe] == PrüfeAuf) {
                    Reihe += 1
                } else {
                    break;
                }
            }
        }
    }
    for (let index = 0; index <= 3; index++) {
        if (index != 0) {
            if (aktuelleSpielerPosition - index >= 0) {
                list = Feld[aktuelleSpielerPosition - index]
                if (list[SpielerHoehe] == PrüfeAuf) {
                    Reihe += 1
                } else {
                    break;
                }
            }
        }
    }
    Gewonnen()
}
function checkDiagonalLR () {
    Reihe = 0
    SpielerHoehe = aktuelleSpalte.length - 1
    for (let index = 0; index <= 3; index++) {
        if (index != 0) {
            if (aktuelleSpielerPosition - index >= 0) {
                list = Feld[aktuelleSpielerPosition - index]
                if (list[SpielerHoehe + index] == PrüfeAuf) {
                    Reihe += 1
                } else {
                    break;
                }
            }
        }
    }
    SpielerHoehe = aktuelleSpalte.length - 1
    for (let index = 0; index <= 3; index++) {
        if (index != 0) {
            if (aktuelleSpielerPosition + index <= 6) {
                list = Feld[aktuelleSpielerPosition + index]
                if (list[SpielerHoehe - index] == PrüfeAuf) {
                    Reihe += 1
                } else {
                    break;
                }
            }
        }
    }
    if (Reihe == 3) {
        game.over(true, effects.confetti)
    }
}
function SetzeSpielFeldArray () {
    Spalte0 = [0]
    Spalte1 = [0]
    Spalte2 = [0]
    Spalte3 = [0]
    Spalte4 = [0]
    Spalte5 = [0]
    Spalte6 = [0]
    Feld = [
    Spalte0,
    Spalte1,
    Spalte2,
    Spalte3,
    Spalte4,
    Spalte5,
    Spalte6
    ]
}
function SetzeSprites () {
    Spieler1Pfeil = sprites.create(img`
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
        . . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        . . . 2 2 2 2 2 2 2 2 2 2 2 . . . 
        . . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . . . 2 2 2 2 2 2 2 . . . . . 
        . . . . . . 2 2 2 2 2 . . . . . . 
        . . . . . . . 2 2 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        `, SpriteKind.AuaswahlPfeil1)
    Spieler2Pfeil = sprites.create(img`
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
        . . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . . 7 7 7 7 7 7 7 7 7 7 7 . . . 
        . . . . 7 7 7 7 7 7 7 7 7 . . . . 
        . . . . . 7 7 7 7 7 7 7 . . . . . 
        . . . . . . 7 7 7 7 7 . . . . . . 
        . . . . . . . 7 7 7 . . . . . . . 
        . . . . . . . . 7 . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        `, SpriteKind.AuswahlPfeil2)
    Spieler2Stein = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . 6 6 6 5 5 6 6 6 . . . . 
        . . . 7 7 7 7 6 6 6 6 6 6 . . . 
        . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
        . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
        . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
        . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
        . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
        . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
        . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
        . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
        . . . 6 8 8 8 8 8 8 8 8 6 . . . 
        . . . . 6 6 8 8 8 8 6 6 . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.SpielStein)
    Spieler2Stein.setFlag(SpriteFlag.Invisible, true)
    Spieler1Stein = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . 4 4 4 5 5 4 4 4 . . . . 
        . . . 3 3 3 3 4 4 4 4 4 4 . . . 
        . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
        . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
        . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
        . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
        . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
        . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
        . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
        . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
        . . . 4 2 2 2 2 2 2 2 2 4 . . . 
        . . . . 4 4 2 2 2 2 4 4 . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.SpielStein)
    Spieler2Pfeil.setFlag(SpriteFlag.Invisible, true)
}
let Spieler2Stein: Sprite = null
let Spalte6: number[] = []
let Spalte5: number[] = []
let Spalte4: number[] = []
let Spalte3: number[] = []
let Spalte2: number[] = []
let Spalte1: number[] = []
let Spalte0: number[] = []
let list: number[] = []
let SpielerHoehe = 0
let Reihe = 0
let Feld: number[][] = []
let OutputText = ""
let Spieler2Pfeil: Sprite = null
let aktuelleSpalte: number[] = []
let PrüfeAuf = 0
let PfeilFeld = 0
let unausgewaelterPfeil: Sprite = null
let Spieler1Stein: Sprite = null
let aktuellerSpielStein: Sprite = null
let Spieler1Pfeil: Sprite = null
let aktuellerSpieler: Sprite = null
let aktuelleSpielerPosition = 0
SetzeSprites()
SetzeSpielFeldArray()
tiles.setTilemap(tilemap`Level1`)
aktuelleSpielerPosition = 0
aktuellerSpieler = Spieler1Pfeil
aktuellerSpielStein = Spieler1Stein
for (let index = 0; index < 7; index++) {
    unausgewaelterPfeil = sprites.create(img`
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . d d d d d d d d d d d d d d d . 
        . . d d d d d d d d d d d d d . . 
        . . . d d d d d d d d d d d . . . 
        . . . . d d d d d d d d d . . . . 
        . . . . . d d d d d d d . . . . . 
        . . . . . . d d d d d . . . . . . 
        . . . . . . . d d d . . . . . . . 
        . . . . . . . . d . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        `, SpriteKind.AuswahlPfeil)
    grid.place(unausgewaelterPfeil, tiles.getTileLocation(PfeilFeld, aktuelleSpielerPosition))
    unausgewaelterPfeil.y += 2
    unausgewaelterPfeil.x += 2
    PfeilFeld = PfeilFeld + 1
}
zeichnePlayerPfeil(aktuellerSpieler)
