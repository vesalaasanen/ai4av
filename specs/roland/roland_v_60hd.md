---
spec_id: admin/roland-v-60hd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Roland V-60HD Control Spec"
manufacturer: Roland
model_family: V-60HD
aliases: []
compatible_with:
  manufacturers:
    - Roland
  models:
    - V-60HD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - static.roland.com
source_urls:
  - https://static.roland.com/assets/media/pdf/V-60HD_reference_v31_eng04_W.pdf
  - https://static.roland.com/assets/media/pdf/V-60HD_v31_eng02_W.pdf
retrieved_at: 2026-06-14T20:47:18.094Z
last_checked_at: 2026-06-16T07:15:38.718Z
generated_at: 2026-06-16T07:15:38.718Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no power on/off commands documented in source; power state cannot be controlled via this protocol"
  - "no authentication procedure described for LAN; source does not state whether Telnet requires login"
  - "no settable continuous variables beyond the level-action params already"
  - "source documents no named multi-step macro sequences. Sequential command"
  - "source contains no power-on sequencing, no interlock procedures for the"
  - "firmware version compatibility range not stated in source"
  - "no documented power-on / power-off command — device power is not controllable via this protocol"
  - "LAN authentication (Telnet login) not described; assumed none based on absence of any login procedure"
  - "response timing / timeouts for ACK not specified"
  - "QAL response label inconsistency in source — param text mentions both \"11 (MASTER OUT), 12 (AUX), 12 (ALL)\" and later \"a=12 MASTER OUT, a=13 sends all\"; the action param above preserves a=13 for ALL per the response-command description"
verification:
  verdict: verified
  checked_at: 2026-06-16T07:15:38.718Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions matched literally with opcodes from the source command reference; transport parameters verified; one-to-one coverage with no missing commands. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-14
---

# Roland V-60HD Control Spec

## Summary
The Roland V-60HD is a multi-format video switcher with integrated audio mixing. This spec covers its remote-control interface, which is exposed over LAN (TCP, port 8023, Telnet-style) and RS-232 (DB-9, 9600/38400 bps). Commands are ASCII strings framed by an STX (0x02) start byte and a trailing `;`. The device also exposes a TALLY/GPI DB-25 connector for tally output and contact-closure GPI input.

<!-- UNRESOLVED: no power on/off commands documented in source; power state cannot be controlled via this protocol -->
<!-- UNRESOLVED: no authentication procedure described for LAN; source does not state whether Telnet requires login -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 8023
serial:
  baud_rate: 9600  # source lists 9600 and 38400 as selectable; 9600 is the menu default
  # baud_rate alternatives: [9600, 38400]  # source: BAUDRATE menu item
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: xon_xoff  # source: "Flow control: XON/XOFF"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - routable   # inferred: PGM/PST/AUX channel selection commands present
  - queryable  # inferred: QAL/QPL/TLY/ACS/VER query commands present
  - levelable  # inferred: IAL/OAL/OAX/KYL/KYG level-set commands present
```

## Actions
```yaml
# Command format (verbatim from source):
#   STX (ASCII 02H) + <cmd code 3 letters> + ":" + <param> + "," + <param> + ";"
# Below, the literal "stx" stands for the ASCII 0x02 start byte as written in the source.
# ACK (ASCII 06H) is returned for every accepted command (see Feedbacks).

# --- Video-related operations ---
- id: pgm_select
  label: Select channel for final video output (PGM)
  kind: action
  command: "stxPGM:a;"
  params:
    - name: a
      type: integer
      description: "0 (SDI IN 1), 1 (SDI IN 2), 2 (SDI IN 3), 3 (SDI IN 4), 4 (HDMI IN 5), 5 (HDMI/RGB IN 6), 6 (STILL/BKG IN 7), 7 (STILL/BKG IN 8)"

- id: pst_select
  label: Select channel for preset video (PST)
  kind: action
  command: "stxPST:a;"
  params:
    - name: a
      type: integer
      description: "0 (SDI IN 1) .. 7 (STILL/BKG IN 8) - same mapping as PGM"

- id: aux_select
  label: Select channel to send to AUX bus
  kind: action
  command: "stxAUX:a;"
  params:
    - name: a
      type: integer
      description: "0 (SDI IN 1) .. 7 (STILL/BKG IN 8) - same mapping as PGM"

- id: trs_set
  label: Select transition effect
  kind: action
  command: "stxTRS:a;"
  params:
    - name: a
      type: integer
      description: "0 (MIX), 1 (WIPE 1), 2 (WIPE 2)"

- id: tim_set
  label: Set video transition time
  kind: action
  command: "stxTIM:a;"
  params:
    - name: a
      type: integer
      description: "0 (0.0 sec) - 40 (4.0 sec)"

- id: cut
  label: Press the [CUT] button
  kind: action
  command: "stxCUT;"
  params: []

- id: auto
  label: Press the [AUTO] button
  kind: action
  command: "stxATO;"
  params: []

- id: pinp1_sw
  label: Press the [PinP 1] button
  kind: action
  command: "stxP1S;"
  params: []

- id: pinp2_sw
  label: Press the [PinP 2] button
  kind: action
  command: "stxP2S;"
  params: []

- id: split_sw
  label: Press the [SPLIT] button
  kind: action
  command: "stxSPS;"
  params: []

- id: dsk_sw
  label: Press the [DSK] button
  kind: action
  command: "stxDSK;"
  params: []

- id: dsk_pvW
  label: Press the DSK [PVW] button
  kind: action
  command: "stxDVW;"
  params: []

- id: dsk_auto_mixing
  label: Press the DSK [AUTO MIXING] button
  kind: action
  command: "stxATM;"
  params: []

- id: dsk_output_fade
  label: Press the DSK [OUTPUT FADE] button
  kind: action
  command: "stxFDE;"
  params: []

- id: pinp1_position
  label: Adjust display position of PinP 1 inset screen
  kind: action
  command: "stxPP1:a,b;"
  params:
    - name: a
      type: integer
      description: "-450-450 horizontal position"
    - name: b
      type: integer
      description: "-400-400 vertical position"

- id: pinp2_position
  label: Adjust display position of PinP 2 inset screen
  kind: action
  command: "stxPP2:a,b;"
  params:
    - name: a
      type: integer
      description: "-450-450 horizontal position"
    - name: b
      type: integer
      description: "-400-400 vertical position"

- id: split_position
  label: Adjust split composition display position
  kind: action
  command: "stxSPT:a,b;"
  params:
    - name: a
      type: integer
      description: "-250-250; for V-CENTER = left/final output video, for H-CENTER = upper/final output video"
    - name: b
      type: integer
      description: "-250-250; for V-CENTER = right/preset video, for H-CENTER = lower/preset video"

- id: dsk_source
  label: Set DSK overlaid logo/image channel
  kind: action
  command: "stxDSS:a;"
  params:
    - name: a
      type: integer
      description: "0 (SDI IN 1) .. 7 (STILL/BKG IN 8) - same mapping as PGM"

- id: dsk_key_level
  label: Adjust DSK key level (extraction amount)
  kind: action
  command: "stxKYL:a;"
  params:
    - name: a
      type: integer
      description: "0-255"

- id: dsk_key_gain
  label: Adjust DSK key gain (semi-transmissive region)
  kind: action
  command: "stxKYG:a;"
  params:
    - name: a
      type: integer
      description: "0-255"

- id: input_select_ch6
  label: Select input connector for channel 6
  kind: action
  command: "stxIPS:a;"
  params:
    - name: a
      type: integer
      description: "0 (HDMI), 1 (RGB/COMPONENT)"

- id: sdi_out1_bus
  label: Set video bus for SDI OUT 1 connector
  kind: action
  command: "stxOS1:a;"
  params:
    - name: a
      type: integer
      description: "0 (PGM), 1 (PVW), 2 (AUX)"

- id: sdi_out2_bus
  label: Set video bus for SDI OUT 2 connector
  kind: action
  command: "stxOS2:a;"
  params:
    - name: a
      type: integer
      description: "0 (PGM), 1 (PVW), 2 (AUX)"

- id: hdmi_out1_bus
  label: Set video bus for HDMI OUT 1 connector
  kind: action
  command: "stxOH1:a;"
  params:
    - name: a
      type: integer
      description: "0 (PGM), 1 (PVW), 2 (AUX)"

- id: hdmi_out2_bus
  label: Set video bus for HDMI OUT 2 connector
  kind: action
  command: "stxOH2:a;"
  params:
    - name: a
      type: integer
      description: "0 (PGM), 1 (PVW), 2 (AUX)"

# --- Audio-related operations ---
- id: input_audio_level
  label: Adjust volume level of input audio
  kind: action
  command: "stxIAL:a,b;"
  params:
    - name: a
      type: integer
      description: "0 (AUDIO IN 1), 1 (AUDIO IN 2), 2 (AUDIO IN 3), 3 (AUDIO IN 4), 4 (AUDIO IN 5/6), 5 (SDI IN 1), 6 (SDI IN 2), 7 (SDI IN 3), 8 (SDI IN 4), 9 (HDMI IN 5), 10 (HDMI IN 6)"
    - name: b
      type: integer
      description: "-801 (-INF), -800 (-80.0 dB) - 0 (0.0 dB) - 100 (10.0 dB)"

- id: master_out_level
  label: Adjust volume level for master out
  kind: action
  command: "stxOAL:a;"
  params:
    - name: a
      type: integer
      description: "-801 (-INF), -800 (-80.0 dB) - 0 (0.0 dB) - 100 (10.0 dB)"

- id: aux_bus_level
  label: Adjust volume level for AUX-bus audio
  kind: action
  command: "stxOAX:a;"
  params:
    - name: a
      type: integer
      description: "-801 (-INF), -800 (-80.0 dB) - 0 (0.0 dB) - 100 (10.0 dB)"

- id: input_audio_delay
  label: Adjust delay time of input audio
  kind: action
  command: "stxADT:a,b;"
  params:
    - name: a
      type: integer
      description: "0 (AUDIO IN 1), 1 (AUDIO IN 2), 2 (AUDIO IN 3), 3 (AUDIO IN 4), 4 (AUDIO IN 5/6)"
    - name: b
      type: integer
      description: "0 (0.0 fps) - 120 (12.0 fps)"

- id: input_audio_mute
  label: Specify mute function for input audio
  kind: action
  command: "stxIAM:a;"
  params:
    - name: a
      type: integer
      description: "0 (AUDIO IN 1), 1 (AUDIO IN 2), 2 (AUDIO IN 3), 3 (AUDIO IN 4), 4 (AUDIO IN 5/6), 5 (SDI 1), 6 (SDI 2), 7 (SDI 3), 8 (SDI 4), 9 (HDMI 5), 10 (HDMI 6)"

- id: input_audio_solo
  label: Specify solo function for input audio
  kind: action
  command: "stxIAS:a;"
  params:
    - name: a
      type: integer
      description: "0 (AUDIO IN 1), 1 (AUDIO IN 2), 2 (AUDIO IN 3), 3 (AUDIO IN 4), 4 (AUDIO IN 5/6), 5 (SDI 1), 6 (SDI 2), 7 (SDI 3), 8 (SDI 4), 9 (HDMI 5), 10 (HDMI 6)"

# --- Audio queries ---
- id: audio_level_query
  label: Acquire information on volume level
  kind: query
  command: "stxQAL:a;"
  params:
    - name: a
      type: integer
      description: "0 (AUDIO IN 1), 1 (AUDIO IN 2), 2 (AUDIO IN 3), 3 (AUDIO IN 4), 4 (AUDIO IN 5/6), 5 (SDI IN 1), 6 (SDI IN 2), 7 (SDI IN 3), 8 (SDI IN 4), 9 (HDMI IN 5), 10 (HDMI IN 6), 11 (MASTER OUT), 12 (AUX), 13 (ALL)"

# --- System-related operations ---
- id: hdcp_set
  label: Set HDCP on/off
  kind: action
  command: "stxHCP:a;"
  params:
    - name: a
      type: integer
      description: "0 (OFF), 1 (ON)"

- id: test_pattern_set
  label: Set test pattern
  kind: action
  command: "stxTPT:a;"
  params:
    - name: a
      type: integer
      description: "0 (OFF), 1 (75% COLOR BAR), 2 (100% COLOR BAR), 3 (RAMP), 4 (STEP), 5 (HATCH)"

- id: test_tone_set
  label: Set test tone
  kind: action
  command: "stxTTN:a;"
  params:
    - name: a
      type: integer
      description: "0 (OFF), 1 (-20dB@1kHz : 1kHz), 2 (-10dB@1kHz : 1kHz), 3 (0dB@1kHz : 1kHz), 4 (-20dB@1kHz : 400Hz), 5 (-10dB@1kHz : 400Hz), 6 (0dB@1kHz : 400Hz)"

- id: memory_recall
  label: Call up preset memory
  kind: action
  command: "stxMEM:a;"
  params:
    - name: a
      type: integer
      description: "0 (1), 1 (2), 2 (3), 3 (4), 4 (5), 5 (6), 6 (7), 7 (8)"

# --- System queries ---
- id: panel_button_status_query
  label: Acquire status of operation-panel buttons
  kind: query
  command: "stxQPL:a;"
  params:
    - name: a
      type: integer
      description: "0 (PGM), 1 (PST), 2 (AUX), 3 (PinP/SPLIT), 4 (DSK), 5 (OUTPUT FADE), 6 (Video fade level), 7 (ALL)"

- id: crosspoint_status_query
  label: Acquire cross-point status (tally)
  kind: query
  command: "stxTLY;"
  params: []

- id: device_status_query
  label: Acquire status of V-60HD
  kind: query
  command: "stxACS;"
  params: []

- id: version_query
  label: Version information
  kind: query
  command: "stxVER;"
  params: []

# --- Flow control (ASCII control codes, not framed commands) ---
- id: xon
  label: Flow control XON
  kind: action
  command: "XON"  # ASCII 11H
  params: []

- id: xoff
  label: Flow control XOFF
  kind: action
  command: "XOFF"  # ASCII 13H
  params: []
```

## Feedbacks
```yaml
# ACK (ASCII 06H) is returned for every accepted command (not enumerated per-action).
- id: ack
  type: fixed
  values: ["ACK (0x06)"]

# Response payloads for queries (returned framed like commands):
- id: audio_level_response
  type: numeric
  description: "Response to QAL; stxQAL:b; where b is -801..100 per channel (see QAL action params)"

- id: panel_button_status_response
  type: numeric
  description: "Response to QPL; stxQPL:b; - see source for per-a value encoding"

- id: crosspoint_status_response
  type: enum
  description: "Response to TLY; stxTLY:a,b,..,h; - a-h per channel 1-8, each 0 (Dark), 1 (Red), 2 (Green)"

- id: version_response
  type: string
  description: "Response to VER; stxVER:V-60HD,a; where a = ASCII version string"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables beyond the level-action params already
# enumerated in Actions (IAL/OAL/OAX/KYL/KYG/TIM/PP1/PP2/SPT/ADT). Source does not
# document named persisted variables distinct from these commands.
```

## Events
```yaml
# Unsolicited notifications the device sends.
- id: error_notification
  description: "stxERR:a; sent when an error is detected"
  payload:
    name: a
    type: integer
    values:
      0: "syntax error"
      4: "invalid (controlled by another setting)"
      5: "out of range error"

- id: xon_notification
  description: "XON (ASCII 11H) sent spontaneously for flow control"

- id: xoff_notification
  description: "XOFF (ASCII 13H) sent spontaneously for flow control"

# NOTE: When menu item PANEL INFORMATION = ON and RS-232 = ON, the device always
# transmits QPL (a=7 ALL) on cross-point / PGM-A / PST-B bus changes (source p.23,
# referenced from the RS-232/GPI menu explanation).
- id: panel_info_autonomous_qpl
  description: "Autonomous stxQPL:...; sent on bus/channel switch when PANEL INFORMATION is ON"
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step macro sequences. Sequential command
# sending IS supported, but each command must wait for its ACK before the next is sent
# (see Notes).
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Never connect anything to an N.C. (no-connect) pin on the TALLY/GPI DB-25 connector (source: pin assignment note)."
# UNRESOLVED: source contains no power-on sequencing, no interlock procedures for the
# LAN/RS-232 command layer. TALLY/GPI hardware specs (open collector 12V/200mA,
# photocoupler input DC 24V 0.1A) are electrical, not protocol safety items.
```

## Notes
- **Command framing (verbatim):** every command begins with STX (ASCII `02H`) and ends with `;`. The literal `stx` in command strings below denotes that `0x02` byte, exactly as written in the source tables.
- **ACK handshake:** after each command the controller MUST wait for an `ACK` (`06H`) before sending the next command. XON (`11H`) / XOFF (`13H`) are flow-control bytes interleaved with this handshake.
- **Control codes are not framed:** STX (`02H`), ACK (`06H`), XON (`11H`), XOFF (`13H`) are raw control bytes; only the 3-letter opcodes plus their `:` / `,` / `;` delimiters form the textual command body.
- **Code set:** ASCII throughout (source: "Code set: ASCII").
- **Two selectable baud rates:** 9600 (default) and 38400; both RS-232 and LAN use the identical command set.
- **LAN = Telnet over TCP port 8023.** Source: "You use Telnet to operate the V-60HD remotely over a LAN (TCP/IP protocol)" / "Port number: 8023".
- **GPI is hardware contact-closure only** (DB-25, no-voltage make-contact, trailing-edge low=ON); it is not part of the ASCII command protocol but its assignable function list mirrors several opcodes (PGM/PST/MEMORY LOAD/DSK SRC SEL/MUTE/SOLO/DSK SW/AUTO SW/CUT SW/OUTPUT FADE SW/AUTO MIXING SW).
- **Default IP:** `192.168.2.254` (only when CONFIGURE = MANUALLY; otherwise DHCP). Subnet default `255.255.255.0`.

<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: no documented power-on / power-off command — device power is not controllable via this protocol -->
<!-- UNRESOLVED: LAN authentication (Telnet login) not described; assumed none based on absence of any login procedure -->
<!-- UNRESOLVED: response timing / timeouts for ACK not specified -->
<!-- UNRESOLVED: QAL response label inconsistency in source — param text mentions both "11 (MASTER OUT), 12 (AUX), 12 (ALL)" and later "a=12 MASTER OUT, a=13 sends all"; the action param above preserves a=13 for ALL per the response-command description -->
````

Spec emitted. One markdown document, no preamble/trailer. All commands copied verbatim (`stx…;`), RS-232 + TCP both populated from explicit source rows, no invented voltage/port/baud. UNRESOLVED markers on power, auth, firmware, timing, and the QAL index ambiguity in the source.

## Provenance

```yaml
source_domains:
  - static.roland.com
source_urls:
  - https://static.roland.com/assets/media/pdf/V-60HD_reference_v31_eng04_W.pdf
  - https://static.roland.com/assets/media/pdf/V-60HD_v31_eng02_W.pdf
retrieved_at: 2026-06-14T20:47:18.094Z
last_checked_at: 2026-06-16T07:15:38.718Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:15:38.718Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions matched literally with opcodes from the source command reference; transport parameters verified; one-to-one coverage with no missing commands. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no power on/off commands documented in source; power state cannot be controlled via this protocol"
- "no authentication procedure described for LAN; source does not state whether Telnet requires login"
- "no settable continuous variables beyond the level-action params already"
- "source documents no named multi-step macro sequences. Sequential command"
- "source contains no power-on sequencing, no interlock procedures for the"
- "firmware version compatibility range not stated in source"
- "no documented power-on / power-off command — device power is not controllable via this protocol"
- "LAN authentication (Telnet login) not described; assumed none based on absence of any login procedure"
- "response timing / timeouts for ACK not specified"
- "QAL response label inconsistency in source — param text mentions both \"11 (MASTER OUT), 12 (AUX), 12 (ALL)\" and later \"a=12 MASTER OUT, a=13 sends all\"; the action param above preserves a=13 for ALL per the response-command description"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
