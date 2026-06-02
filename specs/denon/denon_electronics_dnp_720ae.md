---
spec_id: admin/denon-electronics-dnp-720ae
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon Electronics DNP-720AE Control Spec"
manufacturer: Denon
model_family: DNP-720AE
aliases: []
compatible_with:
  manufacturers:
    - Denon
    - "Denon Electronics"
  models:
    - DNP-720AE
    - "DNP-720AE SE"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.denon.com
source_urls:
  - https://assets.denon.com/documentmaster/uk/dnp720ae_se_system_protocol_ver1_03.pdf
retrieved_at: 2026-04-29T16:29:23.093Z
last_checked_at: 2026-06-02T21:41:28.434Z
generated_at: 2026-06-02T21:41:28.434Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated; protocol version (Ver.8.0.0) is a document revision, not a device firmware version"
  - "no settable scalar variables distinct from discrete actions in the source"
  - "no multi-step sequences described in source"
  - "source contains no safety warnings, interlock procedures, or"
  - "MU/MV command parameter sets not enumerated in supplied source; firmware version not stated; 9L, 9N, 9O, 9P, 9Q, 9R, 9S, 9T, 9U, 9V NS codes not listed in source (only 90-94, 9A-9M, 9W shown)."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:28.434Z
  matched_actions: 60
  action_count: 60
  confidence: medium
  summary: "All 60 spec actions matched with exact wire-level commands; transport parameters (TCP port 23, baud 9600, 8/N/1) verified verbatim in source. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Denon Electronics DNP-720AE Control Spec

## Summary
Network audio player (DNP-720AE / DNP-720AE SE) controlled via the Denon SYSTEM control protocol. Source declares the application terminal as Ethernet (TCP port 23, ASCII commands terminated with CR 0x0D). RS-232C connector pinout and serial config are documented in the source for reference, but the application model uses Ethernet.

<!-- UNRESOLVED: firmware version not stated; protocol version (Ver.8.0.0) is a document revision, not a device firmware version -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP port 23 (telnet), per source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from PWON / PWSTANDBY commands
- routable   # inferred from SI (input select) commands
- queryable  # inferred from PW?, SI?, FV?, TM?, TFAN?, TPAN? query commands
```

## Actions
```yaml
- id: power_on
  label: Power ON
  kind: action
  command: "PWON<CR>"
  params: []

- id: power_standby
  label: Power STANDBY
  kind: action
  command: "PWSTANDBY<CR>"
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "PW?<CR>"
  params: []

- id: select_input_tuner
  label: Select Input TUNER
  kind: action
  command: "SITUNER<CR>"
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

- id: select_input_query
  label: Current Input Query
  kind: query
  command: "SI?<CR>"
  params: []

- id: favorite_direct
  label: FAVORITE Direct Change
  kind: action
  command: "FV{favorite_no}<CR>"
  params:
    - name: favorite_no
      type: integer
      description: Two or three ASCII characters for FAVORITE number (per source: "uses two or three ASCII characters")

- id: favorite_query
  label: FAVORITE List Query
  kind: query
  command: "FV ?<CR>"
  params: []

- id: tuner_frequency_up
  label: TUNER Frequency UP
  kind: action
  command: "TFANUP<CR>"
  params: []

- id: tuner_frequency_down
  label: TUNER Frequency DOWN
  kind: action
  command: "TFANDOWN<CR>"
  params: []

- id: tuner_frequency_set
  label: TUNER Frequency Set
  kind: action
  command: "TFAN{freq}<CR>"
  params:
    - name: freq
      type: string
      description: "6-digit frequency. >050000 = AM (kHz). <050000 = FM (MHz). Example: TFAN105000 = 1050.00 kHz AM"

- id: tuner_frequency_query
  label: TUNER Frequency Query
  kind: query
  command: "TFAN?<CR>"
  params: []

- id: tuner_preset_up
  label: TUNER Preset UP
  kind: action
  command: "TPANUP<CR>"
  params: []

- id: tuner_preset_down
  label: TUNER Preset DOWN
  kind: action
  command: "TPANDOWN<CR>"
  params: []

- id: tuner_preset_set
  label: TUNER Preset Direct
  kind: action
  command: "TPAN{preset_no}<CR>"
  params:
    - name: preset_no
      type: string
      description: "Two-character preset number (e.g. TPAN50 = PRESET No.50)"

- id: tuner_preset_query
  label: TUNER Preset Query
  kind: query
  command: "TPAN?<CR>"
  params: []

- id: tuner_preset_memory
  label: TUNER Preset Memory
  kind: action
  command: "TPANMEM{preset_no}<CR>"
  params:
    - name: preset_no
      type: string
      description: "Two-digit preset slot to store into (e.g. TPANMEM05)"

- id: tuner_band_am
  label: TUNER Band AM
  kind: action
  command: "TMANAM<CR>"
  params: []

- id: tuner_band_fm
  label: TUNER Band FM
  kind: action
  command: "TMANFM<CR>"
  params: []

- id: tuner_band_query
  label: TUNER Band/Mode Query
  kind: query
  command: "TM?<CR>"
  params: []

- id: tuner_mode_auto
  label: TUNER Mode AUTO
  kind: action
  command: "TMANAUTO<CR>"
  params: []

- id: tuner_mode_manual
  label: TUNER Mode MANUAL
  kind: action
  command: "TMANMANUAL<CR>"
  params: []

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
  label: FAVORITE ON
  kind: action
  command: "MNFAV ON<CR>"
  params: []

- id: favorite_off
  label: FAVORITE OFF
  kind: action
  command: "MNFAV OFF<CR>"
  params: []

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
  label: Network Play
  kind: action
  command: "NS9A<CR>"
  params: []

- id: ns_pause
  label: Network Pause
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
  label: Network Repeat One
  kind: action
  command: "NS9H<CR>"
  params: []

- id: ns_repeat_all
  label: Network Repeat All
  kind: action
  command: "NS9I<CR>"
  params: []

- id: ns_repeat_off
  label: Network Repeat Off
  kind: action
  command: "NS9J<CR>"
  params: []

- id: ns_random_repeat_all
  label: Network Random On / Repeat All
  kind: action
  command: "NS9K<CR>"
  params: []

- id: ns_random_off
  label: Network Random Off
  kind: action
  command: "NS9M<CR>"
  params: []

- id: ns_browse_remote_toggle
  label: Browse Mode / Remote Mode Toggle (iPod Direct)
  kind: action
  command: "NS9W<CR>"
  params: []

- id: ns_preset1_call
  label: Net Audio Preset 1 Call
  kind: action
  command: "NSP1<CR>"
  params: []

- id: ns_preset2_call
  label: Net Audio Preset 2 Call
  kind: action
  command: "NSP2<CR>"
  params: []

- id: ns_preset3_call
  label: Net Audio Preset 3 Call
  kind: action
  command: "NSP3<CR>"
  params: []

- id: ns_preset1_memory
  label: Net Audio Preset 1 Memory
  kind: action
  command: "NSP1 MEM<CR>"
  params: []

- id: ns_preset2_memory
  label: Net Audio Preset 2 Memory
  kind: action
  command: "NSP2 MEM<CR>"
  params: []

- id: ns_preset3_memory
  label: Net Audio Preset 3 Memory
  kind: action
  command: "NSP3 MEM<CR>"
  params: []

- id: ns_preset_status
  label: Net Audio Preset 1-3 Status (UTF-8)
  kind: query
  command: "NSP<CR>"
  params: []

- id: ns_onscreen_info
  label: Request Onscreen Display Information
  kind: query
  command: "NSE<CR>"
  params: []

- id: ns_direct_char_search
  label: Direct Character Search
  kind: action
  command: "NSD{char}<CR>"
  params:
    - name: char
      type: string
      description: "Single character 0-9 or A-Z (except iPod Direct)"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  notes: "Device emits EVENT PWON<CR> or PWSTANDBY<CR> on power state change; PW?<CR> query returns the same."

- id: current_input
  type: enum
  values: [tuner, rhapsody, napster, pandora, lastfm, iradio, server, usb]
  notes: "Device emits SItoken<CR> EVENT on input change; SI?<CR> query returns it."

- id: favorite_name
  type: string
  notes: "EVENT FV + favorite_no + 35-byte fixed payload: char count + null + name (UTF-8). See source page 13 for layout."
  example: "FV25FM-87.50MHz<CR>"

- id: tuner_frequency
  type: string
  notes: "EVENT TFAN******<CR> on frequency change. 6 digits, >050000 = AM kHz, <050000 = FM MHz."

- id: tuner_preset
  type: string
  notes: "EVENT TPANA1<CR> example. PRESET number A-prefixed in the source's example."

- id: tuner_band_mode
  type: enum
  values: [anam, anfm, anauto, anmanual]
  notes: "EVENT TMANAM / TMANFM / TMANAUTO / TMANMANUAL on band/mode change."

- id: ns_preset_status
  type: object
  notes: "EVENT NSP01<20-digit name><CR> through NSP03<20-digit name><CR> for presets 1-3 (UTF-8)."

- id: ns_onscreen_lines
  type: object
  notes: "EVENT NSE0 through NSE8 (9 lines) of 96-byte fixed UTF-8 payload each, returned in response to NSE<CR>. Format: <marker><95 chars max>_<?...>. See source page 15."
```

## Variables
```yaml
# UNRESOLVED: no settable scalar variables distinct from discrete actions in the source
```

## Events
```yaml
# The source documents unsolicited EVENT messages. They share the COMMAND+PARAMETER+CR
# format and represent state-change notifications. See Feedbacks section for the
# enumerated EVENTs (PW, SI, FV, TF, TP, TM, NS preset status, NSE lines).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Note K) in the source says "wait 1 second
# before next command after PWON" but that is a timing note, not a safety interlock.
```

## Notes
- Application model DNP720AE(SE) declares "Application terminal: Ethernet". The RS-232C connector spec (Section Ⅰ) is included in the source for reference but the device's control interface is TCP port 23.
- All commands are ASCII CODE + parameter + CR (0x0D). Allowed character range: 0x20 to 0x7F. 0x0D is used only as the terminator.
- Maximum data length: 135 bytes per message.
- RESPONSE must be returned within 200 ms of receiving a request command (COMMAND+?+CR).
- Power-on sequencing: wait 1 second after PWON before sending the next COMMAND.
- TF/TP/TM commands only operate when the input source is TUNER.
- Source is document version "Ver.8.0.0" of the Denon SYSTEM control protocol; do not confuse with device firmware version.
- The document mentions MU and MV commands in the protocol overview (mute and master volume) but does not list their parameter values in the supplied source — they are referenced but not enumerated.
<!-- UNRESOLVED: MU/MV command parameter sets not enumerated in supplied source; firmware version not stated; 9L, 9N, 9O, 9P, 9Q, 9R, 9S, 9T, 9U, 9V NS codes not listed in source (only 90-94, 9A-9M, 9W shown). -->

## Provenance

```yaml
source_domains:
  - assets.denon.com
source_urls:
  - https://assets.denon.com/documentmaster/uk/dnp720ae_se_system_protocol_ver1_03.pdf
retrieved_at: 2026-04-29T16:29:23.093Z
last_checked_at: 2026-06-02T21:41:28.434Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:28.434Z
matched_actions: 60
action_count: 60
confidence: medium
summary: "All 60 spec actions matched with exact wire-level commands; transport parameters (TCP port 23, baud 9600, 8/N/1) verified verbatim in source. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated; protocol version (Ver.8.0.0) is a document revision, not a device firmware version"
- "no settable scalar variables distinct from discrete actions in the source"
- "no multi-step sequences described in source"
- "source contains no safety warnings, interlock procedures, or"
- "MU/MV command parameter sets not enumerated in supplied source; firmware version not stated; 9L, 9N, 9O, 9P, 9Q, 9R, 9S, 9T, 9U, 9V NS codes not listed in source (only 90-94, 9A-9M, 9W shown)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
