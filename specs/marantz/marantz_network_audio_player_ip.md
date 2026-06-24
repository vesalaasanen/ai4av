---
spec_id: admin/marantz-na-7004
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz NA-7004 Control Spec"
manufacturer: Marantz
model_family: NA-7004
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - NA-7004
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
  - marantz.com
  - raw.githubusercontent.com
  - github.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://www.marantz.com/en-us/product/archive-network-audio-players/na7004/NA7004.html
  - https://raw.githubusercontent.com/Ericvf/RS232c-Tcp-Marantz/master/NA7004_PROTOCOL_V01.pdf
  - https://www.marantz.com/en-us/product/archive-network-audio-players/na-11s1/NA11S1.html
  - https://github.com/ChrisBrandhorst/node-marantz-ip-control
retrieved_at: 2026-06-23T08:04:22.127Z
last_checked_at: 2026-06-23T08:13:17.822Z
generated_at: 2026-06-23T08:13:17.822Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full MV (Master Volume) command table not present in source (referenced as \"see page 7 section J\" but table omitted). MVDOWN not documented verbatim. Channel volume, surround mode, and many AVR-style commands absent — this is a network audio player, not an AVR."
  - "flow control not stated in source (procedural = \"Non procedural\")"
  - "MVDOWN not documented verbatim in source. Full MV table referenced"
  - "source does not document a separate variable namespace."
  - "source documents no multi-step command sequences."
  - "no further safety warnings, fault behavior, or error recovery"
  - "firmware version compatibility not stated in source."
  - "MVDOWN command and full MV command table missing from extracted source (page 7 J reference)."
  - "voltage, current, power specs not in protocol document."
  - "protocol version number not stated."
  - "Network Standby mode is a front-panel setting, not a documented remote command."
verification:
  verdict: verified
  checked_at: 2026-06-23T08:13:17.822Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 68 spec actions matched verbatim in NA7004 source command table; transport (port 23, 9600 8N1) verified; bidirectional coverage complete. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Marantz NA-7004 Control Spec

## Summary
Marantz NA-7004 Network Audio Player. Supports both RS-232C and Ethernet (TCP/IP telnet) control using an ASCII command protocol of the form `COMMAND + PARAMETER + CR (0x0D)` where COMMAND is 2 ASCII characters and PARAMETER up to 25 ASCII characters. Covers power, input source select, master volume, M-DAX, tuner (analog AM/FM and DAB), favorites, menu cursor, and network/USB/iPod direct playback control.

<!-- UNRESOLVED: full MV (Master Volume) command table not present in source (referenced as "see page 7 section J" but table omitted). MVDOWN not documented verbatim. Channel volume, surround mode, and many AVR-style commands absent — this is a network audio player, not an AVR. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP port 23 (telnet), stated verbatim in source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source (procedural = "Non procedural")
auth:
  type: none  # inferred: no auth procedure in source
```

Notes: Ethernet connector RJ-45 (10BASE-T/100BASE-TX), half duplex, 10/100 Mbps, max data length 135 bytes. RS-232C connector DB-9pin female (DCE, straight), pins 1=GND, 2=TxD, 3=RxD, 5=Common(GND), 4/6/7/8/9=NC. Tone step synchronization, half duplex, non-procedural, max 135 bytes. ASCII range 0x20–0x7F plus CR (0x0D) as terminator. RESPONSE to a request command must be sent within 200ms. After PWON, wait 1 second before sending next command.

## Traits
```yaml
traits:
  - powerable   # inferred from PWON/PWSTANDBY power commands
  - queryable   # inferred from PW?/SI?/TF?/TP?/TM?/PSMDA ?/FV ? query commands
  - levelable   # inferred from MV master volume commands
  - routable    # inferred from SI input source routing commands
```

## Actions
```yaml
# All commands terminate with CR (0x0D), shown here as <CR> per source convention.
# Each command verbatim from source COMMAND and PARAMETER list.

# --- PW: Power ---
- id: power_on
  label: Power On / Standby Toggle
  kind: action
  command: "PWON<CR>"
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  command: "PWSTANDBY<CR>"
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "PW?<CR>"
  params: []

# --- SI: Select Input source ---
- id: select_input_tuner
  label: Select Input TUNER
  kind: action
  command: "SITUNER<CR>"
  params: []

- id: select_input_auxa
  label: Select Input AUX-A
  kind: action
  command: "SIAUXA<CR>"
  params: []

- id: select_input_auxb
  label: Select Input AUX-B
  kind: action
  command: "SIAUXB<CR>"
  params: []

- id: select_input_auxc
  label: Select Input AUX-C
  kind: action
  command: "SIAUXC<CR>"
  params: []

- id: select_input_m_xport
  label: Select Input M-XPORT
  kind: action
  command: "SIM-XPORT<CR>"
  params: []

- id: select_input_rhapsody
  label: Select Input RHAPSODY
  kind: action
  command: "SIRHAPSODY<CR>"
  params: []

- id: select_input_napster
  label: Select Input NAPSTER
  kind: action
  command: "SINAPSTER<CR>"
  params: []

- id: select_input_pandora
  label: Select Input PANDORA
  kind: action
  command: "SIPANDORA<CR>"
  params: []

- id: select_input_lastfm
  label: Select Input LASTFM
  kind: action
  command: "SILASTFM<CR>"
  params: []

- id: select_input_iradio
  label: Select Input IRADIO
  kind: action
  command: "SIIRADIO<CR>"
  params: []

- id: select_input_server
  label: Select Input SERVER
  kind: action
  command: "SISERVER<CR>"
  params: []

- id: select_input_usb
  label: Select Input USB
  kind: action
  command: "SIUSB<CR>"
  params: []

- id: input_source_query
  label: Input Source Query
  kind: query
  command: "SI?<CR>"
  params: []

# --- MV: Master Volume ---
- id: master_volume_up
  label: Master Volume Up
  kind: action
  command: "MVUP<CR>"
  params: []

- id: master_volume_set
  label: Master Volume Set
  kind: action
  command: "MV{level}<CR>"
  params:
    - name: level
      type: string
      description: >-
        2 or 3 ASCII chars. .0dB step uses 2 chars (MV80 = 0dB, MV99 = +19dB,
        MV79 = -1dB, MV00 = -80dB). .5dB step uses 3 chars (MV805 = +0.5dB,
        MV795 = -0.5dB, MV005 = -79.5dB, MV995 = -80.5dB). See source page 7 D.

# UNRESOLVED: MVDOWN not documented verbatim in source. Full MV table referenced
# as "see page 7 J section" but omitted from extracted text.

# --- PS: Parameter Set (M-DAX) ---
- id: mdax_hi
  label: M-DAX Hi
  kind: action
  command: "PSMDA HI<CR>"
  params: []

- id: mdax_mid
  label: M-DAX Mid
  kind: action
  command: "PSMDA MID<CR>"
  params: []

- id: mdax_low
  label: M-DAX Low
  kind: action
  command: "PSMDA LOW<CR>"
  params: []

- id: mdax_off
  label: M-DAX Off
  kind: action
  command: "PSMDAOFF<CR>"
  params: []

- id: mdax_status_query
  label: M-DAX Status Query
  kind: query
  command: "PSMDA ?<CR>"
  params: []

# --- FV: Favorite direct change ---
- id: favorite_direct_change
  label: Favorite Direct Change
  kind: action
  command: "FV {no}<CR>"
  params:
    - name: "no"
      type: integer
      description: Favorite number (e.g. FV 25)

- id: favorite_list_query
  label: Favorite List Query
  kind: query
  command: "FV ?<CR>"
  params: []

# --- TF: Tuner Frequency (Analog) ---
- id: tuner_freq_analog_up
  label: Tuner Frequency Up (Analog)
  kind: action
  command: "TFANUP<CR>"
  params: []

- id: tuner_freq_analog_down
  label: Tuner Frequency Down (Analog)
  kind: action
  command: "TFANDOWN<CR>"
  params: []

- id: tuner_freq_analog_direct
  label: Tuner Frequency Direct (Analog)
  kind: action
  command: "TFAN{freq}<CR>"
  params:
    - name: freq
      type: string
      description: >-
        6 digits. >050000 = AM kHz (e.g. TFAN105000 = 1050.00 kHz AM).
        <050000 = FM MHz (e.g. TFAN08750 = 87.50 MHz FM).

- id: tuner_freq_analog_query
  label: Tuner Frequency Query (Analog)
  kind: query
  command: "TFAN?<CR>"
  params: []

# --- TP: Tuner Preset (Analog) ---
- id: tuner_preset_analog_up
  label: Tuner Preset Up (Analog)
  kind: action
  command: "TPANUP<CR>"
  params: []

- id: tuner_preset_analog_down
  label: Tuner Preset Down (Analog)
  kind: action
  command: "TPANDOWN<CR>"
  params: []

- id: tuner_preset_analog_direct
  label: Tuner Preset Direct (Analog)
  kind: action
  command: "TPAN{preset}<CR>"
  params:
    - name: preset
      type: integer
      description: Preset number (e.g. TPAN50 = preset "50")

- id: tuner_preset_analog_query
  label: Tuner Preset Query (Analog)
  kind: query
  command: "TPAN?<CR>"
  params: []

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: "TPANMEM{no}<CR>"
  params:
    - name: "no"
      type: integer
      description: Memory slot number (e.g. TPANMEM05)

# --- TM: Tuner Mode/Band (Analog) ---
- id: tuner_band_am
  label: Tuner Band AM
  kind: action
  command: "TMANAM<CR>"
  params: []

- id: tuner_band_fm
  label: Tuner Band FM
  kind: action
  command: "TMANFM<CR>"
  params: []

- id: tuner_mode_query
  label: Tuner Mode Query
  kind: query
  command: "TM?<CR>"
  params: []

- id: tuner_tuning_mode_auto
  label: Tuner Tuning Mode Auto
  kind: action
  command: "TMANAUTO<CR>"
  params: []

- id: tuner_tuning_mode_manual
  label: Tuner Tuning Mode Manual
  kind: action
  command: "TMANMANUAL<CR>"
  params: []

# --- DAB Tuner Control ---
- id: dab_station_up
  label: DAB Station Up
  kind: action
  command: "TFDAUP<CR>"
  params: []

- id: dab_station_down
  label: DAB Station Down
  kind: action
  command: "TFDADOWN<CR>"
  params: []

- id: dab_station_query
  label: DAB Station Query
  kind: query
  command: "TFDA?<CR>"
  params: []

- id: tuner_band_dab
  label: Tuner Band DAB
  kind: action
  command: "TMDA<CR>"
  params: []

# --- MN: Menu / Favorite Control ---
- id: menu_cursor_up
  label: Menu Cursor Up
  kind: action
  command: "MNCUP<CR>"
  params: []

- id: menu_cursor_down
  label: Menu Cursor Down
  kind: action
  command: "MNCDN<CR>"
  params: []

- id: menu_cursor_left
  label: Menu Cursor Left
  kind: action
  command: "MNCLT<CR>"
  params: []

- id: menu_cursor_right
  label: Menu Cursor Right
  kind: action
  command: "MNCRT<CR>"
  params: []

- id: menu_enter
  label: Menu Enter
  kind: action
  command: "MNENT<CR>"
  params: []

- id: favorite_on
  label: Favorite ON
  kind: action
  command: "MNFAV ON<CR>"
  params: []

- id: favorite_off
  label: Favorite OFF
  kind: action
  command: "MNFAV OFF<CR>"
  params: []

# --- NS: Network / Rhapsody / Napster / USB / iPod Direct Extended Control ---
- id: ns_cursor_up
  label: Network Cursor Up
  kind: action
  command: "NS90<CR>"
  params: []

- id: ns_cursor_down
  label: Network Cursor Down
  kind: action
  command: "NS91<CR>"
  params: []

- id: ns_cursor_left
  label: Network Cursor Left
  kind: action
  command: "NS92<CR>"
  params: []

- id: ns_cursor_right
  label: Network Cursor Right
  kind: action
  command: "NS93<CR>"
  params: []

- id: ns_enter
  label: Network Enter (Play/Pause)
  kind: action
  command: "NS94<CR>"
  params: []

- id: ns_play
  label: Network Play (iRadio/mServer/USB) / Play-Pause (iPod Direct)
  kind: action
  command: "NS9A<CR>"
  params: []

- id: ns_pause
  label: Network Pause / Play-Pause (iPod Direct)
  kind: action
  command: "NS9B<CR>"
  params: []

- id: ns_stop
  label: Network Stop
  kind: action
  command: "NS9C<CR>"
  params: []

- id: ns_skip_plus
  label: Network Skip Plus
  kind: action
  command: "NS9D<CR>"
  params: []

- id: ns_skip_minus
  label: Network Skip Minus
  kind: action
  command: "NS9E<CR>"
  params: []

- id: ns_repeat_one
  label: Network Repeat One (USB/iPod Direct/mServer/Rhapsody/Napster)
  kind: action
  command: "NS9H<CR>"
  params: []

- id: ns_repeat_all
  label: Network Repeat All (USB/iPod Direct/mServer/Rhapsody/Napster)
  kind: action
  command: "NS9I<CR>"
  params: []

- id: ns_repeat_off
  label: Network Repeat Off (USB/iPod Direct/mServer/Rhapsody/Napster)
  kind: action
  command: "NS9J<CR>"
  params: []

- id: ns_random_on
  label: >-
    Network Random On / Repeat All (USB/mServer/Rhapsody/Napster);
    Shuffle Songs (iPod Direct only)
  kind: action
  command: "NS9K<CR>"
  params: []

- id: ns_random_off
  label: >-
    Network Random Off (USB/mServer/Rhapsody/Napster);
    Shuffle Off (iPod Direct only)
  kind: action
  command: "NS9M<CR>"
  params: []

- id: ns_toggle_browse_remote
  label: Toggle Browse Mode / Remote Mode (iPod Direct only)
  kind: action
  command: "NS9W<CR>"
  params: []

- id: ns_onscreen_info_request
  label: Request Onscreen Display Information List (UTF-8)
  kind: query
  command: "NSE<CR>"
  params: []
  notes: Returns NSE0 through NSE8 (see Feedbacks).

- id: ns_direct_char_search
  label: Direct Character Search (except iPod Direct)
  kind: action
  command: "NSD{char}<CR>"
  params:
    - name: char
      type: string
      description: Single character from 0-9 or A-Z (e.g. NSD0)
```

## Feedbacks
```yaml
# EVENT/RESPONSE forms mirror COMMANDs. Source: "The form of EVENT presupposes
# that it is the same as that of COMMAND." Sent unsolicited on direct state change.

- id: power_state
  type: enum
  values: [ON, STANDBY]
  command: "PWON<CR> / PWSTANDBY<CR>"
  notes: Sent on power change.

- id: input_source_state
  type: enum
  values: [TUNER, AUXA, AUXB, AUXC, M-XPORT, RHAPSODY, NAPSTER, PANDORA, LASTFM, IRADIO, SERVER, USB]
  command: "SI{source}<CR>"
  notes: Sent on input source change (e.g. SITUNER<CR>).

- id: mdax_state
  type: enum
  values: [HIGH, MID, LOW, OFF]
  command: "PSMDA {state}<CR>"
  notes: Sent on M-DAX change (e.g. PSMDA HIGH<CR>).

- id: favorite_name_response
  type: string
  command: "FV{no}_{name}<CR>"
  notes: >-
    "FAVORITE NAME" response. Format FV{no:Favorite No.}{len:char length MAX32}_{name}.
    * = Favorite No., a = Character Length (MAX 32 byte), _ = Null,
    ? = Don't Care (chars after Null disregarded). 35-byte fixed.
    Example: FV25FM-87.50MHz<CR>.

- id: tuner_frequency_state
  type: string
  command: "TFAN{freq}<CR>"
  notes: >-
    6 digits. >050000 = AM kHz, <050000 = FM MHz.
    Example: TFAN105000<CR> (1050.00 kHz AM).

- id: tuner_preset_state
  type: string
  command: "TPAN{preset}<CR>"
  notes: Example TPANA1<CR> (Preset "A1").

- id: tuner_mode_state
  type: enum
  values: [ANAM, ANFM, ANAUTO, ANMANUAL]
  command: "TM{state}<CR>"
  notes: Band/mode change. ANAM=AM, ANFM=FM, ANAUTO=Auto, ANMANUAL=Manual.

- id: dab_station_state
  type: string
  command: "TFDA{block}<CR>"
  notes: 3 digits Frequency Block at DAB band. Example: TFDA13F<CR> ("13F" block).

- id: dab_band_state
  type: enum
  values: [DA]
  command: "TMDA<CR>"
  notes: Band set to DAB.

- id: onscreen_display_line
  type: string
  command: "NSE{0-8}{data}_?????<CR>"
  notes: >-
    9 lines (NSE0-NSE8) UTF-8 display info. NSE1-NSE6 carry a 1-byte
    Cursor/Playable flag: Bit1=Playable Music, Bit4=Cursor Select.
    * = UTF-8 char (MAX 95 byte), _ = Null, ? = Don't Care. 96-byte fixed.
    NSE0 example: "NSE0Now Playing  USB_????<CR>".
```

## Variables
```yaml
# Discrete settable parameters are represented as Actions above (PSMDA, TM,
# MV level, etc.). No additional continuous variables beyond MV documented.
# UNRESOLVED: source does not document a separate variable namespace.
```

## Events
```yaml
# Unsolicited EVENTs are identical in form to the Feedbacks listed above and are
# sent by the device when operated directly (state change from front panel etc.).
# See Feedbacks section. COMMAND is receivable also during EVENT transmission.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "After PWON, wait 1 second before transmitting next COMMAND (source item K)."
  - "TF/TP commands cannot operate when INPUT source isn't TUNER."
  - "NS commands apply to Network/Rhapsody/Napster/USB/iPod Direct sources."
# UNRESOLVED: no further safety warnings, fault behavior, or error recovery
# sequences documented in source.
```

## Notes
- Model name appears as both "NA-7004" and "NA7004" in source; spec uses NA-7004.
- Application terminal: RS-232C / Ethernet. Application model: NA-7004.
- ASCII CODE usable range 0x20–0x7F plus CR (0x0D) as pause/terminator sign.
- COMMAND is exactly 2 ASCII characters; PARAMETER up to 25 ASCII characters.
- Special parameter `?` = request command.
- RESPONSE must be sent within 200ms of receiving the request COMMAND.
- RESPONSE is sent for commands that have an EVENT counterpart; not needed for commands without EVENT (e.g. SV — though SV is not used on this device).
- Master Volume minimum level parameter defines "99"; supports 0.5dB step using 3-char parameter (see master_volume_set description).
- North America model adds the D.IN(USB)/D.IN(COAXIAL)/D.IN(OPTICAL) inputs in the SI row note; these are not separately enumerated as commands in the table and are marked as North-America-only.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: MVDOWN command and full MV command table missing from extracted source (page 7 J reference). -->
<!-- UNRESOLVED: voltage, current, power specs not in protocol document. -->
<!-- UNRESOLVED: protocol version number not stated. -->
<!-- UNRESOLVED: Network Standby mode is a front-panel setting, not a documented remote command. -->
````

Spec done. 68 actions enumerated (every distinct row from source tables). Both transports (TCP:23 + RS-232C 9600/8/N/1) populated verbatim. Auth inferred none. MVDOWN + full MV table marked UNRESOLVED — page 7 ref cut from extract.

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
  - marantz.com
  - raw.githubusercontent.com
  - github.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://www.marantz.com/en-us/product/archive-network-audio-players/na7004/NA7004.html
  - https://raw.githubusercontent.com/Ericvf/RS232c-Tcp-Marantz/master/NA7004_PROTOCOL_V01.pdf
  - https://www.marantz.com/en-us/product/archive-network-audio-players/na-11s1/NA11S1.html
  - https://github.com/ChrisBrandhorst/node-marantz-ip-control
retrieved_at: 2026-06-23T08:04:22.127Z
last_checked_at: 2026-06-23T08:13:17.822Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T08:13:17.822Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 68 spec actions matched verbatim in NA7004 source command table; transport (port 23, 9600 8N1) verified; bidirectional coverage complete. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full MV (Master Volume) command table not present in source (referenced as \"see page 7 section J\" but table omitted). MVDOWN not documented verbatim. Channel volume, surround mode, and many AVR-style commands absent — this is a network audio player, not an AVR."
- "flow control not stated in source (procedural = \"Non procedural\")"
- "MVDOWN not documented verbatim in source. Full MV table referenced"
- "source does not document a separate variable namespace."
- "source documents no multi-step command sequences."
- "no further safety warnings, fault behavior, or error recovery"
- "firmware version compatibility not stated in source."
- "MVDOWN command and full MV command table missing from extracted source (page 7 J reference)."
- "voltage, current, power specs not in protocol document."
- "protocol version number not stated."
- "Network Standby mode is a front-panel setting, not a documented remote command."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
