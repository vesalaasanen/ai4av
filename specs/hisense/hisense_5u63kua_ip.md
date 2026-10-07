---
spec_id: admin/hisense-5u63kua
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense Prosumer TV (5U63KUA) RS-232 Control Spec"
manufacturer: HiSense
model_family: 5U63KUA
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 5U63KUA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:42.333Z
last_checked_at: 2026-10-07T17:16:11.114Z
generated_at: 2026-10-07T17:16:11.114Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list any major gaps here"
  - "POIS table is truncated in the refined source. Additional input values (HDMI/VGA etc.) may exist; only 0..3 captured here."
  - "source describes no unsolicited event/notification frames. Acknowledgement is a"
  - "source does not document safety warnings, interlocks, or power-on sequencing"
verification:
  verdict: verified
  checked_at: 2026-10-07T17:16:11.114Z
  matched_actions: 278
  action_count: 278
  confidence: medium
  summary: "All 278 action units match source commands, IR codes and query commands, and the transport values are verbatim; the source's empty Models field leaves model applicability to 5U63KUA unconfirmed. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense Prosumer TV (5U63KUA) RS-232 Control Spec

## Summary
RS-232 / discrete IR control protocol for HiSense Prosumer TV (5U63KUA). This spec captures the serial control surface (set/query ASCII commands over a fixed-length framed protocol on a DB9 connector at 9600 8N1). The document also documents a large discrete IR code table, summarised in Notes but not enumerated as serial actions.

Source explicitly states: "RS-232C Compliant", "Baud Rate 9600bps (UART), Data Length 8bits, Parity Bit None, Stop Bit 1bit, Flow Control None, Communication Code ASCII".

NOTE: the request prompt labelled this as "TCP/IP", but the source contains no IP/network transport — the MAC address field is only used to populate the 3-byte client ID for multi-TV serial addressing. Protocol is serial RS-232 only.

<!-- UNRESOLVED: list any major gaps here -->
<!-- IR code table (60+ Pronto/CCF entries) is present in source but is not enumerated under Actions; only serial commands are. See Notes. -->
<!-- POIS table appears truncated at end of source; only values 0..3 captured. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  communication_code: ASCII
  connector: DB9 female chassis mount  # from source: "standard DB9 D-sub connector. The jack type on the TV is a female chassis mount connector"
auth:
  type: UNRESOLVED
```

### Frame format (from source, verbatim)

**Command (PC/Control System → TV), fixed length 14 bytes:**

| Field            | Size      | Notes                                                                  |
|------------------|-----------|------------------------------------------------------------------------|
| OPERATION        | 1 byte    | `S` for Set, `Q` for Query                                             |
| CLIENT ID        | 3 bytes   | `0-9,A-F`; Smart TV = last 3 bytes of Ethernet MAC; `ALL` = broadcast  |
| COMMAND          | 4 bytes   | `A-Z`, see Commands table                                              |
| DATA             | 4 bytes   | `0-9,A-Z,#,?`                                                          |
| CHECKSUM         | 1 byte    | 8-bit; whole string including CHECKSUM byte sums to 0x00               |
| TERMINATION      | 1 byte    | `0x0D` (CR)                                                            |

**Acknowledgement (TV → Controller):**

`[CLIENT ID 3B] : [ACK 4B] [DATA 4B] [CHECKSUM 1B] [0x0D]`

`ACK` is most commonly `OKAY`, `EROR`, or `WAIT`. The protocol is case sensitive.

## Traits
```yaml
- powerable       # inferred from POWR / PWRE commands
- routable        # inferred from INPT input select commands
- queryable       # inferred from many Q???? query commands
- levelable       # inferred from BRIT, CONT, COLR, TINT, SHRP, VOLM, BKLV level commands
```

## Actions
```yaml
# Generic (broadcast) HEX form used for all commands below: SALL + COMMAND(4B) + DATA(4B) + CHECKSUM(1B) + 0x0D
# For broadcast to "ALL" client ID the ASCII form is "SALL<CMD><DATA><cs>\r" (13 visible chars + CR).
# For per-TV addressing, replace "ALL" with last 3 hex bytes of the TV's MAC address.
# Checksum byte is computed so the 8-bit sum of the entire string (including the checksum byte) equals 0x00.
# Source states: "The protocol is case sensitive."

# ---- Power on/off control ----
- id: pwre_disable
  label: Disable RS-232 Remote Power On
  kind: action
  command: "PWRE0000"  # GENERIC HEX: 53 41 4C 4C 50 57 52 45 30 30 30 30 D6 0D
  params: []

- id: pwre_enable
  label: Enable RS-232 Remote Power On
  kind: action
  command: "PWRE0001"  # GENERIC HEX: 53 41 4C 4C 50 57 52 45 30 30 30 31 D5 0D
  params: []

- id: pwre_query
  label: Query Power On Command Setting
  kind: query
  command: "PWRE????"  # GENERIC HEX: 51 41 4C 4C 50 57 52 45 3F 3F 3F 3F 9C 0D
  params: []

- id: power_standby
  label: Set Power Standby
  kind: action
  command: "POWR0000"  # GENERIC HEX: 53 41 4C 4C 50 4F 57 52 30 30 30 30 CC 0D
  params: []

- id: power_on
  label: Set Power On
  kind: action
  command: "POWR0001"  # GENERIC HEX: 53 41 4C 4C 50 4F 57 52 30 30 30 31 CB 0D
  params: []

# ---- Input source selection ----
- id: inpt_cycle
  label: Change Input Signal One at a Time
  kind: action
  command: "INPT0000"  # GENERIC HEX: 53 41 4C 4C 49 4E 50 54 30 30 30 30 D9 0D
  params: []

- id: inpt_tv
  label: Set Input Signal TV
  kind: action
  command: "INPT0001"  # GENERIC HEX: 53 41 4C 4C 49 4E 50 54 30 30 30 31 D8 0D
  params: []

- id: inpt_av
  label: Set Input Signal AV
  kind: action
  command: "INPT0004"  # GENERIC HEX: 53 41 4C 4C 49 4E 50 54 30 30 30 34 D5 0D
  params: []

- id: inpt_component
  label: Set Input Signal Component
  kind: action
  command: "INPT0003"  # GENERIC HEX: 53 41 4C 4C 49 4E 50 54 30 30 30 33 D6 0D
  params: []

- id: inpt_hdmi1
  label: Set Input Signal HDMI1
  kind: action
  command: "INPT0009"  # GENERIC HEX: 53 41 4C 4C 49 4E 50 54 30 30 30 39 D0 0D
  params: []

- id: inpt_hdmi2
  label: Set Input Signal HDMI2
  kind: action
  command: "INPT0010"  # GENERIC HEX: 53 41 4C 4C 49 4E 50 54 30 30 31 30 D8 0D
  params: []

- id: inpt_hdmi3
  label: Set Input Signal HDMI3
  kind: action
  command: "INPT0011"  # GENERIC HEX: 53 41 4C 4C 49 4E 50 54 30 30 31 31 D7 0D
  params: []

- id: inpt_hdmi4
  label: Set Input Signal HDMI4
  kind: action
  command: "INPT0012"  # GENERIC HEX: 53 41 4C 4C 49 4E 50 54 30 30 31 32 D6 0D
  params: []

- id: inpt_vga
  label: Set Input Signal VGA
  kind: action
  command: "INPT0006"  # GENERIC HEX: 53 41 4C 4C 49 4E 50 54 30 30 30 36 D3 0D
  params: []

- id: inpt_query
  label: Query Current Input Source
  kind: query
  command: "INPT????"  # GENERIC HEX: 51 41 4C 4C 49 4E 50 54 3F 3F 3F 3F 9F 0D
  params: []

# ---- Picture mode ----
- id: pmod_standard
  label: Set Picture Mode Standard
  kind: action
  command: "PMOD0000"  # GENERIC HEX: 53 41 4C 4C 50 4D 4F 44 30 30 30 30 E4 0D
  params: []

- id: pmod_vivid
  label: Set Picture Mode Vivid
  kind: action
  command: "PMOD0002"  # GENERIC HEX: 53 41 4C 4C 50 4D 4F 44 30 30 30 32 E2 0D
  params: []

- id: pmod_energy
  label: Set Picture Mode EnergySaving
  kind: action
  command: "PMOD0003"  # GENERIC HEX: 53 41 4C 4C 50 4D 4F 44 30 30 30 33 E1 0D
  params: []

- id: pmod_theater
  label: Set Picture Mode Theater
  kind: action
  command: "PMOD0004"  # GENERIC HEX: 53 41 4C 4C 50 4D 4F 44 30 30 30 34 E0 0D
  params: []

- id: pmod_game
  label: Set Picture Mode Game
  kind: action
  command: "PMOD0005"  # GENERIC HEX: 53 41 4C 4C 50 4D 4F 44 30 30 30 35 DF 0D
  params: []

- id: pmod_sport
  label: Set Picture Mode Sport
  kind: action
  command: "PMOD0006"  # GENERIC HEX: 53 41 4C 4C 50 4D 4F 44 30 30 30 36 DE 0D
  params: []

- id: pmod_query
  label: Query Picture Mode
  kind: query
  command: "PMOD????"  # GENERIC HEX: 51 41 4C 4C 50 4D 4F 44 3F 3F 3F 3F AA 0D
  params: []

# ---- Picture level controls (parameterized) ----
- id: brit_set
  label: Set Brightness Value
  kind: action
  command: "BRIT{value}"  # data range 0000-0100; example BRIT0035 hex: 53 41 4C 4C 42 52 49 54 30 30 33 35 DB 0D
  params:
    - name: value
      type: integer
      description: Brightness 0..100 (ASCII decimal, 4-digit zero-padded, range 0000-0100)

- id: brit_query
  label: Query Brightness Value
  kind: query
  command: "BRIT????"  # GENERIC HEX: 51 41 4C 4C 42 52 49 54 3F 3F 3F 3F A9 0D
  params: []

- id: cont_set
  label: Set Contrast Value
  kind: action
  command: "CONT{value}"  # data range 0000-0100; example CONT0069 hex: 53 41 4C 4C 43 4F 4E 54 30 30 36 39 D1 0D
  params:
    - name: value
      type: integer
      description: Contrast 0..100 (ASCII decimal, 4-digit zero-padded, range 0000-0100)

- id: cont_query
  label: Query Contrast Value
  kind: query
  command: "CONT????"  # GENERIC HEX: 51 41 4C 4C 43 4F 4E 54 3F 3F 3F 3F A6 0D
  params: []

- id: colr_set
  label: Set Color Saturation Value
  kind: action
  command: "COLR{value}"  # data range 0000-0100; example COLR0001 hex: 53 41 4C 4C 43 4F 4C 52 30 30 30 31 E3 0D
  params:
    - name: value
      type: integer
      description: Color saturation 0..100 (ASCII decimal, 4-digit zero-padded, range 0000-0100)

- id: colr_query
  label: Query Color Saturation Value
  kind: query
  command: "COLR????"  # GENERIC HEX: 51 41 4C 4C 43 4F 4C 52 3F 3F 3F 3F AA 0D
  params: []

- id: tint_set
  label: Set Tint Value
  kind: action
  command: "TINT{value}"  # data range 0000-0100; example TINT0099 hex: 53 41 4C 4C 54 49 4E 54 30 30 39 39 C3 0D
  params:
    - name: value
      type: integer
      description: Tint 0..100 (ASCII decimal, 4-digit zero-padded, range 0000-0100)

- id: tint_query
  label: Query Tint Value
  kind: query
  command: "TINT????"  # GENERIC HEX: 51 41 4C 4C 54 49 4E 54 3F 3F 3F 3F 9B 0D
  params: []

- id: shrp_set
  label: Set Sharpness Value
  kind: action
  command: "SHRP{value}"  # data range 0000-0020; example SHRP0020 hex: 53 41 4C 4C 53 48 52 50 30 30 32 30 D5 0D
  params:
    - name: value
      type: integer
      description: Sharpness 0..20 (ASCII decimal, 4-digit zero-padded, range 0000-0020)

- id: shrp_query
  label: Query Sharpness Value
  kind: query
  command: "SHRP????"  # GENERIC HEX: 51 41 4C 4C 53 48 52 50 3F 3F 3F 3F 9D 0D
  params: []

# ---- Aspect ratio ----
- id: aspt_auto
  label: Set Aspect Ratio Auto
  kind: action
  command: "ASPT0000"  # GENERIC HEX: 53 41 4C 4C 41 53 50 54 30 30 30 30 DC 0D
  params: []

- id: aspt_normal
  label: Set Aspect Ratio Normal
  kind: action
  command: "ASPT0002"  # GENERIC HEX: 53 41 4C 4C 41 53 50 54 30 30 30 32 DA 0D
  params: []

- id: aspt_zoom
  label: Set Aspect Ratio Zoom
  kind: action
  command: "ASPT0003"  # GENERIC HEX: 53 41 4C 4C 41 53 50 54 30 30 30 33 D9 0D
  params: []

- id: aspt_wide
  label: Set Aspect Ratio Wide
  kind: action
  command: "ASPT0004"  # GENERIC HEX: 53 41 4C 4C 41 53 50 54 30 30 30 34 D8 0D
  params: []

- id: aspt_direct
  label: Set Aspect Ratio Direct
  kind: action
  command: "ASPT0005"  # GENERIC HEX: 53 41 4C 4C 41 53 50 54 30 30 30 35 D7 0D
  params: []

- id: aspt_1to1
  label: Set Aspect Ratio 1-to-1 pixel map
  kind: action
  command: "ASPT0006"  # GENERIC HEX: 53 41 4C 4C 41 53 50 54 30 30 30 36 D6 0D
  params: []

- id: aspt_panoramic
  label: Set Aspect Ratio Panoramic
  kind: action
  command: "ASPT0007"  # GENERIC HEX: 53 41 4C 4C 41 53 50 54 30 30 30 37 D5 0D
  params: []

- id: aspt_cinema
  label: Set Aspect Ratio Cinema
  kind: action
  command: "ASPT0008"  # GENERIC HEX: 53 41 4C 4C 41 53 50 54 30 30 30 38 D4 0D
  params: []

- id: aspt_query
  label: Query Current Aspect Ratio
  kind: query
  command: "ASPT????"  # GENERIC HEX: 51 41 4C 4C 41 53 50 54 3F 3F 3F 3F A2 0D
  params: []

# ---- Overscan ----
- id: ovsn_on
  label: Set Overscan On
  kind: action
  command: "OVSN0000"  # GENERIC HEX: 53 41 4C 4C 4F 56 53 4E 30 30 30 30 CE 0D
  params: []

- id: ovsn_off
  label: Set Overscan Off
  kind: action
  command: "OVSN0002"  # GENERIC HEX: 53 41 4C 4C 4F 56 53 4E 30 30 30 32 CC 0D
  params: []

- id: ovsn_query
  label: Query Overscan
  kind: query
  command: "OVSN????"  # GENERIC HEX: 51 41 4C 4C 4F 56 53 4E 3F 3F 3F 3F 94 0D
  params: []

- id: rstp_picture
  label: Reset Picture Settings
  kind: action
  command: "RSTP1000"  # GENERIC HEX: 53 41 4C 4C 52 53 54 50 31 30 30 30 CA 0D
  params: []

# ---- Color temperature ----
- id: ctem_high
  label: Set Color Temp High
  kind: action
  command: "CTEM0000"  # GENERIC HEX: 53 41 4C 4C 43 54 45 4D 30 30 30 30 EB 0D
  params: []

- id: ctem_middle
  label: Set Color Temp Middle
  kind: action
  command: "CTEM0002"  # GENERIC HEX: 53 41 4C 4C 43 54 45 4D 30 30 30 32 E9 0D
  params: []

- id: ctem_midlow
  label: Set Color Temp Mid-Low
  kind: action
  command: "CTEM0003"  # GENERIC HEX: 53 41 4C 4C 43 54 45 4D 30 30 30 33 E8 0D
  params: []

- id: ctem_low
  label: Set Color Temp Low
  kind: action
  command: "CTEM0004"  # GENERIC HEX: 53 41 4C 4C 43 54 45 4D 30 30 30 34 E7 0D
  params: []

- id: ctem_query
  label: Query Color Temp
  kind: query
  command: "CTEM????"  # GENERIC HEX: 51 41 4C 4C 43 54 45 4D 3F 3F 3F 3F B1 0D
  params: []

# ---- Backlight ----
- id: bklv_set
  label: Set Backlight Value
  kind: action
  command: "BKLV{value}"  # data range 0000-0100; example BKLV0030 hex: 53 41 4C 4C 42 4B 4C 56 30 30 33 30 E2 0D
  params:
    - name: value
      type: integer
      description: Backlight 0..100 (ASCII decimal, 4-digit zero-padded, range 0000-0100)

- id: bklv_query
  label: Query Backlight Value
  kind: query
  command: "BKLV????"  # GENERIC HEX: 51 41 4C 4C 42 4B 4C 56 3F 3F 3F 3F AB 0D
  params: []

# ---- Sound mode ----
- id: amod_standard
  label: Set Sound Mode Standard
  kind: action
  command: "AMOD0000"  # GENERIC HEX: 53 41 4C 4C 41 4D 4F 44 30 30 30 30 F3 0D
  params: []

- id: amod_theater
  label: Set Sound Mode Theater
  kind: action
  command: "AMOD0002"  # GENERIC HEX: 53 41 4C 4C 41 4D 4F 44 30 30 30 32 F1 0D
  params: []

- id: amod_music
  label: Set Sound Mode Music
  kind: action
  command: "AMOD0003"  # GENERIC HEX: 53 41 4C 4C 41 4D 4F 44 30 30 30 33 F0 0D
  params: []

- id: amod_speech
  label: Set Sound Mode Speech
  kind: action
  command: "AMOD0004"  # GENERIC HEX: 53 41 4C 4C 41 4D 4F 44 30 30 30 34 EF 0D
  params: []

- id: amod_late_night
  label: Set Sound Mode Late Night
  kind: action
  command: "AMOD0005"  # GENERIC HEX: 53 41 4C 4C 41 4D 4F 44 30 30 30 35 EE 0D
  params: []

- id: amod_query
  label: Query Sound Mode
  kind: query
  command: "AMOD????"  # GENERIC HEX: 51 41 4C 4C 41 4D 4F 44 3F 3F 3F 3F B9 0D
  params: []

- id: rsta_audio
  label: Reset Audio Settings
  kind: action
  command: "RSTA2000"  # GENERIC HEX: 53 41 4C 4C 52 53 54 41 32 30 30 30 D8 0D
  params: []

# ---- Volume ----
- id: volm_set
  label: Set Volume Value
  kind: action
  command: "VOLM{value}"  # data range 0000-0100; example VOLM0015 hex: 53 41 4C 4C 56 4F 4C 4D 30 30 31 35 D0 0D
  params:
    - name: value
      type: integer
      description: Volume 0..100 (ASCII decimal, 4-digit zero-padded, range 0000-0100)

- id: volm_query
  label: Query Volume
  kind: query
  command: "VOLM????"  # GENERIC HEX: 51 41 4C 4C 56 4F 4C 4D 3F 3F 3F 3F 9C 0D
  params: []

# ---- Mute ----
- id: mute_off
  label: Set Mute Off
  kind: action
  command: "MUTE0000"  # GENERIC HEX: 53 41 4C 4C 4D 55 54 45 30 30 30 30 D9 0D
  params: []

- id: mute_on
  label: Set Mute On
  kind: action
  command: "MUTE0001"  # GENERIC HEX: 53 41 4C 4C 4D 55 54 45 30 30 30 31 D8 0D
  params: []

- id: mute_query
  label: Query Mute Status
  kind: query
  command: "MUTE????"  # GENERIC HEX: 51 41 4C 4C 4D 55 54 45 3F 3F 3F 3F 9F 0D
  params: []

# ---- TV speaker ----
- id: aspk_off
  label: Set TV Speaker Off
  kind: action
  command: "ASPK0000"  # GENERIC HEX: 53 41 4C 4C 41 53 50 4B 30 30 30 30 E5 0D
  params: []

- id: aspk_on
  label: Set TV Speaker On
  kind: action
  command: "ASPK0002"  # GENERIC HEX: 53 41 4C 4C 41 53 50 4B 30 30 30 32 E3 0D
  params: []

- id: aspk_query
  label: Query TV Speaker
  kind: query
  command: "ASPK????"  # GENERIC HEX: 51 41 4C 4C 41 53 50 4B 3F 3F 3F 3F AB 0D
  params: []

# ---- Tuner ----
- id: tunr_antenna
  label: Set Tuner Mode Antenna
  kind: action
  command: "TUNR0000"  # GENERIC HEX: 53 41 4C 4C 54 55 4E 52 30 30 30 30 CB 0D
  params: []

- id: tunr_cable
  label: Set Tuner Mode Cable
  kind: action
  command: "TUNR0002"  # GENERIC HEX: 53 41 4C 4C 54 55 4E 52 30 30 30 32 C9 0D
  params: []

- id: tunr_query
  label: Query Tuner Mode
  kind: query
  command: "TUNR????"  # GENERIC HEX: 51 41 4C 4C 54 55 4E 52 3F 3F 3F 3F 91 0D
  params: []

- id: tscn_auto
  label: Automatic Search
  kind: action
  command: "TSCN0001"  # GENERIC HEX: 53 41 4C 4C 54 53 43 4E 30 30 30 31 DB 0D
  params: []

# ---- Channel step ----
- id: chan_down
  label: Channel Down
  kind: action
  command: "CHAN0000"  # GENERIC HEX: 53 41 4C 4C 43 48 41 4E 30 30 30 30 FA 0D
  params: []

- id: chan_up
  label: Channel Up
  kind: action
  command: "CHAN0001"  # GENERIC HEX: 53 41 4C 4C 43 48 41 4E 30 30 30 31 F9 0D
  params: []

# ---- Closed caption ----
- id: cc_off
  label: Caption Control Off
  kind: action
  command: "CC##0000"  # GENERIC HEX: 53 41 4C 4C 43 43 23 23 30 30 30 30 48 0D
  params: []

- id: cc_on
  label: Caption Control On
  kind: action
  command: "CC##0002"  # GENERIC HEX: 53 41 4C 4C 43 43 23 23 30 30 30 32 46 0D
  params: []

- id: cc_on_when_mute
  label: Caption Control On When Mute
  kind: action
  command: "CC##0003"  # GENERIC HEX: 53 41 4C 4C 43 43 23 23 30 30 30 33 45 0D
  params: []

- id: cc_query
  label: Query Caption Control
  kind: query
  command: "CC##????"  # GENERIC HEX: 51 41 4C 4C 43 43 23 23 3F 3F 3F 3F 0E 0D
  params: []

# ---- Factory reset ----
- id: rset_factory
  label: Restore Factory Settings
  kind: action
  command: "RSET9999"  # GENERIC HEX: 53 41 4C 4C 52 53 45 54 39 39 39 39 B2 0D
  params: []

# ---- OSD language ----
- id: lang_english
  label: OSD Language English
  kind: action
  command: "LANG0000"  # GENERIC HEX: 53 41 4C 4C 4C 41 4E 47 30 30 30 30 F2 0D
  params: []

- id: lang_spanish
  label: OSD Language Espanol
  kind: action
  command: "LANG0002"  # GENERIC HEX: 53 41 4C 4C 4C 41 4E 47 30 30 30 32 F0 0D
  params: []

- id: lang_french
  label: OSD Language Francais
  kind: action
  command: "LANG0003"  # GENERIC HEX: 53 41 4C 4C 4C 41 4E 47 30 30 30 33 EF 0D
  params: []

- id: lang_query
  label: Query OSD Language
  kind: query
  command: "LANG????"  # GENERIC HEX: 51 41 4C 4C 4C 41 4E 47 3F 3F 3F 3F B8 0D
  params: []

# ---- Standby LED ----
- id: pled_off
  label: Standby LED Off
  kind: action
  command: "PLED0000"  # GENERIC HEX: 53 41 4C 4C 50 4C 45 44 30 30 30 30 EF 0D
  params: []

- id: pled_on
  label: Standby LED On
  kind: action
  command: "PLED0002"  # GENERIC HEX: 53 41 4C 4C 50 4C 45 44 30 30 30 32 ED 0D
  params: []

- id: pled_query
  label: Query Standby LED
  kind: query
  command: "PLED????"  # GENERIC HEX: 51 41 4C 4C 50 4C 45 44 3F 3F 3F 3F B5 0D
  params: []

# ---- Remote-control button simulator (BTTN) ----
- id: bttn_ch_plus
  label: Remote Button CH+
  kind: action
  command: "BTTN1034"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 34 D4 0D
  params: []

- id: bttn_ch_minus
  label: Remote Button CH-
  kind: action
  command: "BTTN1035"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 35 D3 0D
  params: []

- id: bttn_vol_minus
  label: Remote Button VOL-
  kind: action
  command: "BTTN1032"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 32 D6 0D
  params: []

- id: bttn_vol_plus
  label: Remote Button VOL+
  kind: action
  command: "BTTN1033"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 33 D5 0D
  params: []

- id: bttn_back
  label: Remote Button BACK
  kind: action
  command: "BTTN1045"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 34 35 D2 0D
  params: []

- id: bttn_power
  label: Remote Button POWER
  kind: action
  command: "BTTN1012"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 31 32 D8 0D
  params: []

- id: bttn_mute
  label: Remote Button MUTE
  kind: action
  command: "BTTN1031"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 31 D7 0D
  params: []

- id: bttn_dash
  label: Remote Button DASH
  kind: action
  command: "BTTN1010"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 31 30 DA 0D
  params: []

- id: bttn_input
  label: Remote Button INPUT
  kind: action
  command: "BTTN1036"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 36 D2 0D
  params: []

- id: bttn_himedia
  label: Remote Button HiMedia (Media Player)
  kind: action
  command: "BTTN1023"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 32 33 D6 0D
  params: []

- id: bttn_digit_0
  label: Remote Button Digit 0
  kind: action
  command: "BTTN1000"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 30 DB 0D
  params: []

- id: bttn_digit_1
  label: Remote Button Digit 1
  kind: action
  command: "BTTN1001"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 31 DA 0D
  params: []

- id: bttn_digit_2
  label: Remote Button Digit 2
  kind: action
  command: "BTTN1002"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 32 D9 0D
  params: []

- id: bttn_digit_3
  label: Remote Button Digit 3
  kind: action
  command: "BTTN1003"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 33 D8 0D
  params: []

- id: bttn_digit_4
  label: Remote Button Digit 4
  kind: action
  command: "BTTN1004"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 34 D7 0D
  params: []

- id: bttn_digit_5
  label: Remote Button Digit 5
  kind: action
  command: "BTTN1005"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 35 D6 0D
  params: []

- id: bttn_digit_6
  label: Remote Button Digit 6
  kind: action
  command: "BTTN1006"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 36 D5 0D
  params: []

- id: bttn_digit_7
  label: Remote Button Digit 7
  kind: action
  command: "BTTN1007"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 37 D4 0D
  params: []

- id: bttn_digit_8
  label: Remote Button Digit 8
  kind: action
  command: "BTTN1008"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 38 D3 0D
  params: []

- id: bttn_digit_9
  label: Remote Button Digit 9
  kind: action
  command: "BTTN1009"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 39 D2 0D
  params: []

- id: bttn_sleep
  label: Remote Button SLEEP
  kind: action
  command: "BTTN1024"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 32 34 D5 0D
  params: []

- id: bttn_mts
  label: Remote Button MTS/SAP
  kind: action
  command: "BTTN1054"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 35 34 D2 0D
  params: []

- id: bttn_live_tv
  label: Remote Button Live TV
  kind: action
  command: "BTTN1055"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 35 35 D1 0D
  params: []

- id: bttn_pause
  label: Remote Button PAUSE
  kind: action
  command: "BTTN1018"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 31 38 D2 0D
  params: []

- id: bttn_play
  label: Remote Button PLAY
  kind: action
  command: "BTTN1016"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 31 36 D4 0D
  params: []

- id: bttn_menu
  label: Remote Button MENU
  kind: action
  command: "BTTN1038"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 38 D0 0D
  params: []

- id: bttn_exit
  label: Remote Button EXIT
  kind: action
  command: "BTTN1046"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 34 36 D1 0D
  params: []

- id: bttn_stop
  label: Remote Button STOP
  kind: action
  command: "BTTN1020"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 32 30 D9 0D
  params: []

- id: bttn_frw
  label: Remote Button Fast Rewind
  kind: action
  command: "BTTN1015"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 31 35 D5 0D
  params: []

- id: bttn_cc
  label: Remote Button CC
  kind: action
  command: "BTTN1027"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 32 37 D2 0D
  params: []

- id: bttn_red
  label: Remote Button Red
  kind: action
  command: "BTTN1050"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 35 30 D6 0D
  params: []

- id: bttn_green
  label: Remote Button Green
  kind: action
  command: "BTTN1051"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 35 31 D5 0D
  params: []

- id: bttn_yellow
  label: Remote Button Yellow
  kind: action
  command: "BTTN1053"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 35 33 D3 0D
  params: []

- id: bttn_blue
  label: Remote Button Blue
  kind: action
  command: "BTTN1052"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 35 32 D4 0D
  params: []

- id: bttn_up
  label: Remote Button UP
  kind: action
  command: "BTTN1041"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 34 31 D6 0D
  params: []

- id: bttn_down
  label: Remote Button DOWN
  kind: action
  command: "BTTN1042"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 34 32 D5 0D
  params: []

- id: bttn_left
  label: Remote Button LEFT
  kind: action
  command: "BTTN1043"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 34 33 D4 0D
  params: []

- id: bttn_right
  label: Remote Button RIGHT
  kind: action
  command: "BTTN1044"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 34 34 D3 0D
  params: []

- id: bttn_ok_enter
  label: Remote Button OK/ENTER
  kind: action
  command: "BTTN1040"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 34 30 D7 0D
  params: []

- id: bttn_ffw
  label: Remote Button Fast Forward
  kind: action
  command: "BTTN1017"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 31 37 D3 0D
  params: []

- id: bttn_previous
  label: Remote Button Previous
  kind: action
  command: "BTTN1019"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 31 39 D1 0D
  params: []

- id: bttn_next
  label: Remote Button Next
  kind: action
  command: "BTTN1021"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 32 31 D8 0D
  params: []

- id: bttn_hismart
  label: Remote Button Connected Home (HiSmart)
  kind: action
  command: "BTTN1039"  # GENERIC HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 39 CF 0D
  params: []

# ---- Power off control mode ----
- id: pbtn_ac_only
  label: Power Off Control Mode AC Only
  kind: action
  command: "PBTN0000"  # GENERIC HEX: 53 41 4C 4C 50 42 54 4E 30 30 30 30 E0 0D
  params: []

- id: pbtn_all
  label: Power Off Control Mode All
  kind: action
  command: "PBTN0001"  # GENERIC HEX: 53 41 4C 4C 50 42 54 4E 30 30 30 31 DF 0D
  params: []

- id: pbtn_query
  label: Query Power Off Control Mode
  kind: query
  command: "PBTN????"  # GENERIC HEX: 51 41 4C 4C 50 42 54 4E 3F 3F 3F 3F A6 0D
  params: []

# ---- Volume range / control mode / locked level ----
- id: mavl_set
  label: Set Volume Range
  kind: action
  command: "MAVL{value}"  # data range 0000-0100; example MAVL0100 hex: 53 41 4C 4C 4D 41 56 4C 30 31 30 30 E3 0D
  params:
    - name: value
      type: integer
      description: Maximum volume 0..100 (ASCII decimal, 4-digit zero-padded, range 0000-0100)

- id: mavl_query
  label: Query Volume Range
  kind: query
  command: "MAVL????"  # GENERIC HEX: 51 41 4C 4C 4D 41 56 4C 3F 3F 3F 3F AA 0D
  params: []

- id: svol_locked
  label: Set Volume Control Locked
  kind: action
  command: "SVOL0000"  # GENERIC HEX: 53 41 4C 4C 53 56 4F 4C 30 30 30 30 D0 0D
  params: []

- id: svol_last
  label: Set Volume Control Last Volume
  kind: action
  command: "SVOL0001"  # GENERIC HEX: 53 41 4C 4C 53 56 4F 4C 30 30 30 31 CF 0D
  params: []

- id: svol_ac_reset
  label: Set Volume Control AC Reset
  kind: action
  command: "SVOL0002"  # GENERIC HEX: 53 41 4C 4C 53 56 4F 4C 30 30 30 32 CE 0D
  params: []

- id: svol_standby_reset
  label: Set Volume Control Standby Reset
  kind: action
  command: "SVOL0003"  # GENERIC HEX: 53 41 4C 4C 53 56 4F 4C 30 30 30 33 CD 0D
  params: []

- id: svol_query
  label: Query Volume Control Mode
  kind: query
  command: "SVOL????"  # GENERIC HEX: 51 41 4C 4C 53 56 4F 4C 3F 3F 3F 3F 96 0D
  params: []

- id: vlfl_set
  label: Set Volume Locked Level
  kind: action
  command: "VLFL{value}"  # data range 0000-0100; example VLFL0010 hex: 53 41 4C 4C 56 4C 46 4C 30 30 31 30 DF 0D
  params:
    - name: value
      type: integer
      description: Locked volume level 0..100 (ASCII decimal, 4-digit zero-padded, range 0000-0100)

- id: vlfl_query
  label: Query Volume Locked Level
  kind: query
  command: "VLFL????"  # GENERIC HEX: 51 41 4C 4C 56 4C 46 4C 3F 3F 3F 3F A6 0D
  params: []

# ---- Remote / panel / menu locks ----
- id: rmot_enable
  label: Remote Key Enable
  kind: action
  command: "RMOT0000"  # GENERIC HEX: 53 41 4C 4C 52 4D 4F 54 30 30 30 30 D2 0D
  params: []

- id: rmot_disable
  label: Remote Key Disable
  kind: action
  command: "RMOT0001"  # GENERIC HEX: 53 41 4C 4C 52 4D 4F 54 30 30 30 31 D1 0D
  params: []

- id: rmot_partial
  label: Remote Key Partial
  kind: action
  command: "RMOT0002"  # GENERIC HEX: 53 41 4C 4C 52 4D 4F 54 30 30 30 32 D0 0D
  params: []

- id: rmot_query
  label: Query Remote Key
  kind: query
  command: "RMOT????"  # GENERIC HEX: 51 41 4C 4C 52 4D 4F 54 3F 3F 3F 3F 98 0D
  params: []

- id: panl_enable
  label: Panel Key Enable
  kind: action
  command: "PANL0000"  # GENERIC HEX: 53 41 4C 4C 50 41 4E 4C 30 30 30 30 E9 0D
  params: []

- id: panl_disable
  label: Panel Key Disable
  kind: action
  command: "PANL0001"  # GENERIC HEX: 53 41 4C 4C 50 41 4E 4C 30 30 30 31 E8 0D
  params: []

- id: panl_query
  label: Query Panel Key
  kind: query
  command: "PANL????"  # GENERIC HEX: 51 41 4C 4C 50 41 4E 4C 3F 3F 3F 3F AF 0D
  params: []

- id: menu_enable
  label: Menu Access Enable
  kind: action
  command: "MENU0000"  # GENERIC HEX: 53 41 4C 4C 4D 45 4E 55 30 30 30 30 DF 0D
  params: []

- id: menu_disable
  label: Menu Access Disable
  kind: action
  command: "MENU0001"  # GENERIC HEX: 53 41 4C 4C 4D 45 4E 55 30 30 30 31 DE 0D
  params: []

- id: menu_query
  label: Query Menu Access
  kind: query
  command: "MENU????"  # GENERIC HEX: 51 41 4C 4C 4D 45 4E 55 3F 3F 3F 3F A5 0D
  params: []

- id: avmn_disable
  label: AV Setting Menu Disable
  kind: action
  command: "AVMN0000"  # GENERIC HEX: 53 41 4C 4C 41 56 4D 4E 30 30 30 30 E2 0D
  params: []

- id: avmn_enable
  label: AV Setting Menu Enable
  kind: action
  command: "AVMN0001"  # GENERIC HEX: 53 41 4C 4C 41 56 4D 4E 30 30 30 31 E1 0D
  params: []

- id: avmn_query
  label: Query AV Setting Menu
  kind: query
  command: "AVMN????"  # GENERIC HEX: 51 41 4C 4C 41 56 4D 4E 3F 3F 3F 3F A8 0D
  params: []

- id: osd_enable
  label: OSD Mode Enable
  kind: action
  command: "OSD#0000"  # GENERIC HEX: 53 41 4C 4C 4F 53 44 23 30 30 30 30 0B 0D
  params: []

- id: osd_disable
  label: OSD Mode Disable
  kind: action
  command: "OSD#0001"  # GENERIC HEX: 53 41 4C 4C 4F 53 44 23 30 30 30 31 0A 0D
  params: []

- id: osd_query
  label: Query OSD Mode
  kind: query
  command: "OSD#????"  # GENERIC HEX: 51 41 4C 4C 4F 53 44 23 3F 3F 3F 3F D1 0D
  params: []

- id: inpm_locked
  label: Input Mode Locked
  kind: action
  command: "INPM0000"  # GENERIC HEX: 53 41 4C 4C 49 4E 50 4D 30 30 30 30 E0 0D
  params: []

- id: inpm_selectable
  label: Input Mode Selectable
  kind: action
  command: "INPM0001"  # GENERIC HEX: 53 41 4C 4C 49 4E 50 4D 30 30 30 31 DF 0D
  params: []

- id: inpm_ac_reset
  label: Input Mode AC Reset
  kind: action
  command: "INPM0002"  # GENERIC HEX: 53 41 4C 4C 49 4E 50 4D 30 30 30 32 DE 0D
  params: []

- id: inpm_standby_reset
  label: Input Mode Standby Reset
  kind: action
  command: "INPM0003"  # GENERIC HEX: 53 41 4C 4C 49 4E 50 4D 30 30 30 33 DD 0D
  params: []

- id: inpm_query
  label: Query Input Mode
  kind: query
  command: "INPM????"  # GENERIC HEX: 51 41 4C 4C 49 4E 50 4D 3F 3F 3F 3F A6 0D
  params: []

# ---- Power-on input source (POIS) - truncated in source ----
- id: pois_last
  label: Power On Input Source Last
  kind: action
  command: "POIS0000"  # GENERIC HEX: 53 41 4C 4C 50 4F 49 53 30 30 30 30 D9 0D
  params: []

- id: pois_air
  label: Power On Input Source Air
  kind: action
  command: "POIS0001"  # GENERIC HEX: 53 41 4C 4C 50 4F 49 53 30 30 30 31 D8 0D
  params: []

- id: pois_av
  label: Power On Input Source AV
  kind: action
  command: "POIS0002"  # GENERIC HEX: 53 41 4C 4C 50 4F 49 53 30 30 30 32 D7 0D
  params: []

- id: pois_component
  label: Power On Input Source Component
  kind: action
  command: "POIS0003"  # GENERIC HEX: 53 41 4C 4C 50 4F 49 53 30 30 30 33 D6 0D
  params: []
# UNRESOLVED: POIS table is truncated in the refined source. Additional input values (HDMI/VGA etc.) may exist; only 0..3 captured here.

# ---- Complete source continuation ----
# The supplied complete source documents the additional POIS rows below.
# Earlier truncation comments are retained from the original draft; POIS coverage is completed here.
- id: pois_hdmi1
  label: Power On Input Source HDMI1
  kind: action
  command: "POIS0005"  # GENERIC HEX: 53 41 4C 4C 50 4F 49 53 30 30 30 35 D4 0D
  params: []

- id: pois_hdmi2
  label: Power On Input Source HDMI2
  kind: action
  command: "POIS0006"  # GENERIC HEX: 53 41 4C 4C 50 4F 49 53 30 30 30 36 D3 0D
  params: []

- id: pois_hdmi3
  label: Power On Input Source HDMI3
  kind: action
  command: "POIS0007"  # GENERIC HEX: 53 41 4C 4C 50 4F 49 53 30 30 30 37 D2 0D
  params: []

- id: pois_hdmi4
  label: Power On Input Source HDMI4
  kind: action
  command: "POIS0008"  # GENERIC HEX: 53 41 4C 4C 50 4F 49 53 30 30 30 38 D1 0D
  params: []

- id: pois_vga
  label: Power On Input Source VGA
  kind: action
  command: "POIS0004"  # GENERIC HEX: 53 41 4C 4C 50 4F 49 53 30 30 30 34 D5 0D
  params: []

- id: pois_query
  label: Query Power On Input Selection
  kind: query
  command: "POIS????"  # GENERIC HEX: 51 41 4C 4C 50 4F 49 53 3F 3F 3F 3F 9F 0D
  params: []

# ---- TV speaker mode ----
- id: spkm_speaker
  label: Set TV Speaker Mode Speaker
  kind: action
  command: "SPKM0000"  # GENERIC HEX: 53 41 4C 4C 53 50 4B 4D 30 30 30 30 D9 0D
  params: []

- id: spkm_off
  label: Set TV Speaker Mode Off
  kind: action
  command: "SPKM0001"  # GENERIC HEX: 53 41 4C 4C 53 50 4B 4D 30 30 30 31 D8 0D
  params: []

- id: spkm_arc_first
  label: Set TV Speaker Mode ARC First
  kind: action
  command: "SPKM0002"  # GENERIC HEX: 53 41 4C 4C 53 50 4B 4D 30 30 30 32 D7 0D
  params: []

- id: spkm_query
  label: Query TV Speaker On/Off Mode
  kind: query
  command: "SPKM????"  # GENERIC HEX: 51 41 4C 4C 53 50 4B 4D 3F 3F 3F 3F 9F 0D
  params: []

# ---- B2B function mode ----
- id: b2bm_enable
  label: Enable B2B Function Mode
  kind: action
  command: "B2BM0000"  # GENERIC HEX: 53 41 4C 4C 42 32 42 4D 30 30 30 30 11 0D
  params: []

- id: b2bm_disable
  label: Disable B2B Function Mode
  kind: action
  command: "B2BM0001"  # GENERIC HEX: 53 41 4C 4C 42 32 42 4D 30 30 30 31 10 0D
  params: []

- id: b2bm_query
  label: Query B2B Function Mode
  kind: query
  command: "B2BM????"  # GENERIC HEX: 51 41 4C 4C 42 32 42 4D 3F 3F 3F 3F D7 0D
  params: []

# ---- USB behavior ----
- id: usbm_home
  label: Set USB Behavior Home
  kind: action
  command: "USBM0000"  # GENERIC HEX: 53 41 4C 4C 55 53 42 4D 30 30 30 30 DD 0D
  params: []

- id: usbm_b2b
  label: Set USB Behavior B2B
  kind: action
  command: "USBM0001"  # GENERIC HEX: 53 41 4C 4C 55 53 42 4D 30 30 30 31 DC 0D
  params: []

- id: usbm_query
  label: Query USB Behavior
  kind: query
  command: "USBM????"  # GENERIC HEX: 51 41 4C 4C 55 53 42 4D 3F 3F 3F 3F A3 0D
  params: []

# ---- Pixel shifting ----
- id: pshf_off
  label: Set Pixel Shifting Off
  kind: action
  command: "PSHF0000"  # GENERIC HEX: 53 41 4C 4C 50 53 48 46 30 30 30 30 E3 0D
  params: []

- id: pshf_on
  label: Set Pixel Shifting On
  kind: action
  command: "PSHF0001"  # GENERIC HEX: 53 41 4C 4C 50 53 48 46 30 30 30 31 E2 0D
  params: []

- id: pshf_query
  label: Query Pixel Shifting
  kind: query
  command: "PSHF????"  # GENERIC HEX: 51 41 4C 4C 50 53 48 46 3F 3F 3F 3F A9 0D
  params: []

# ---- Discrete IR control ----
# The following command values are literal IR codes from the source, not serial commands.
# Source <br> markers in COMPLETE HEX CODE cells are retained verbatim as formatting.
# The serial framing, addressing, checksum and termination comments above do not apply to IR.
# IR emitter integration and model-specific command support are UNRESOLVED.

- id: ir_power_toggle
  label: IR Power Toggle
  kind: action
  command: "04 FB 70 8F"
  params: []

- id: ir_power_on
  label: IR Power On
  kind: action
  command: "04 FB 71 8E"
  params: []

- id: ir_power_off
  label: IR Power Off
  kind: action
  command: "04 FB 72 8D"
  params: []

- id: ir_input_toggle
  label: IR Input Toggle
  kind: action
  command: "04 FB 73 8C"
  params: []

- id: ir_tv_tuner1
  label: IR TV Tuner1
  kind: action
  command: "04 FB 74 8B"
  params: []

- id: ir_tv_tuner2
  label: IR TV Tuner2
  kind: action
  command: "04 FB 75 8A"
  params: []

- id: ir_av1
  label: IR AV1
  kind: action
  command: "04 FB 76 89"
  params: []

- id: ir_av2
  label: IR AV2
  kind: action
  command: "04 FB 77 88"
  params: []

- id: ir_scart_av3
  label: IR SCART/AV3
  kind: action
  command: "04 FB 78 87"
  params: []

- id: ir_component1
  label: IR Component1
  kind: action
  command: "04 FB 79 86"
  params: []

- id: ir_component2
  label: IR Component2
  kind: action
  command: "04 FB 7A 85"
  params: []

- id: ir_component3
  label: IR Component3
  kind: action
  command: "04 FB 7B 84"
  params: []

- id: ir_hdmi1
  label: IR HDMI1
  kind: action
  command: "04FB<br>7C83"
  params: []

- id: ir_hdmi2
  label: IR HDMI2
  kind: action
  command: "04FB<br>7D82"
  params: []

- id: ir_hdmi3
  label: IR HDMI3
  kind: action
  command: "04FB<br>7E81"
  params: []

- id: ir_hdmi4
  label: IR HDMI4
  kind: action
  command: "04FB<br>7F80"
  params: []

- id: ir_hdmi5
  label: IR HDMI5
  kind: action
  command: "04FB<br>807F"
  params: []

- id: ir_vga
  label: IR VGA
  kind: action
  command: "04FB<br>817E"
  params: []

- id: ir_usb
  label: IR USB
  kind: action
  command: "04FB<br>827D"
  params: []

- id: ir_picture_mode_toggle
  label: IR Picture Mode Toggle
  kind: action
  command: "04FB<br>837C"
  params: []

- id: ir_sound_mode_toggle
  label: IR Sound Mode Toggle
  kind: action
  command: "04FB<br>847B"
  params: []

- id: ir_aspect_wide
  label: IR Aspect Ratio Wide 16:9
  kind: action
  command: "04FB<br>857A"
  params: []

- id: ir_aspect_normal
  label: IR Aspect Ratio Normal 4:3
  kind: action
  command: "04FB<br>8679"
  params: []

- id: ir_aspect_cinema
  label: IR Aspect Ratio Cinema
  kind: action
  command: "04FB<br>8778"
  params: []

- id: ir_aspect_panorama
  label: IR Aspect Ratio Panorama
  kind: action
  command: "04FB<br>8877"
  params: []

- id: ir_aspect_zoom
  label: IR Aspect Ratio Zoom
  kind: action
  command: "04FB<br>8976"
  params: []

- id: ir_channel_list
  label: IR Channel List
  kind: action
  command: "04FB<br>8A75"
  params: []

- id: ir_fav_channel
  label: IR Fav Channel
  kind: action
  command: "04FB<br>8B74"
  params: []

- id: ir_sleep
  label: IR Sleep
  kind: action
  command: "04FB<br>8C73"
  params: []

- id: ir_tv_menu_toggle
  label: IR TV Menu Toggle
  kind: action
  command: "04FB<br>8D72"
  params: []

- id: ir_home
  label: IR Home
  kind: action
  command: "04FB<br>8E71"
  params: []

- id: ir_tools
  label: IR Tools Second Menu
  kind: action
  command: "04FB<br>8F70"
  params: []

- id: ir_digit_0
  label: IR Digit 0
  kind: action
  command: "04FB<br>906F"
  params: []

- id: ir_digit_1
  label: IR Digit 1
  kind: action
  command: "04FB<br>916E"
  params: []

- id: ir_digit_2
  label: IR Digit 2
  kind: action
  command: "04FB<br>926D"
  params: []

- id: ir_digit_3
  label: IR Digit 3
  kind: action
  command: "04FB<br>936C"
  params: []

- id: ir_digit_4
  label: IR Digit 4
  kind: action
  command: "04FB<br>946B"
  params: []

- id: ir_digit_5
  label: IR Digit 5
  kind: action
  command: "04FB<br>956A"
  params: []

- id: ir_digit_6
  label: IR Digit 6
  kind: action
  command: "04FB<br>9669"
  params: []

- id: ir_digit_7
  label: IR Digit 7
  kind: action
  command: "04FB<br>9768"
  params: []

- id: ir_digit_8
  label: IR Digit 8
  kind: action
  command: "04FB<br>9867"
  params: []

- id: ir_digit_9
  label: IR Digit 9
  kind: action
  command: "04FB<br>9966"
  params: []

- id: ir_dash
  label: IR Dash
  kind: action
  command: "04FB<br>9A65"
  params: []

- id: ir_previous_channel
  label: IR Previous Channel
  kind: action
  command: "04FB<br>9B64"
  params: []

- id: ir_up_arrow
  label: IR Up Arrow
  kind: action
  command: "04FB<br>9C63"
  params: []

- id: ir_down_arrow
  label: IR Down Arrow
  kind: action
  command: "04FB<br>9D62"
  params: []

- id: ir_left_arrow
  label: IR Left Arrow
  kind: action
  command: "04FB<br>9E61"
  params: []

- id: ir_right_arrow
  label: IR Right Arrow
  kind: action
  command: "04FB<br>9F60"
  params: []

- id: ir_enter
  label: IR Enter
  kind: action
  command: "04FB A05F"
  params: []

- id: ir_select_ok
  label: IR Select OK
  kind: action
  command: "04FB A15E"
  params: []

- id: ir_return
  label: IR Return
  kind: action
  command: "04FB<br>A25D"
  params: []

- id: ir_exit
  label: IR Exit
  kind: action
  command: "04FB<br>A35C"
  params: []

- id: ir_info_display_toggle
  label: IR Info/Display Toggle
  kind: action
  command: "04FBA45B"
  params: []

- id: ir_volume_down
  label: IR Volume Down
  kind: action
  command: "04FB A55A"
  params: []

- id: ir_volume_up
  label: IR Volume Up
  kind: action
  command: "04FB<br>A659"
  params: []

- id: ir_channel_down
  label: IR Channel Down
  kind: action
  command: "04FB<br>A758"
  params: []

- id: ir_channel_up
  label: IR Channel Up
  kind: action
  command: "04FB<br>A857"
  params: []

- id: ir_pip_toggle
  label: IR PIP Toggle
  kind: action
  command: "04FB<br>A956"
  params: []

- id: ir_pip_input
  label: IR PIP Input
  kind: action
  command: "04FB AA55"
  params: []

- id: ir_pip_swap
  label: IR PIP Swap
  kind: action
  command: "04FB<br>AB54"
  params: []

- id: ir_pip_position
  label: IR PIP Position
  kind: action
  command: "04FB<br>AC53"
  params: []

- id: ir_pip_size
  label: IR PIP Size
  kind: action
  command: "04FB<br>AD52"
  params: []

- id: ir_guide_toggle
  label: IR Guide Toggle
  kind: action
  command: "04FB AE51"
  params: []

- id: ir_freeze_toggle
  label: IR Freeze Toggle
  kind: action
  command: "04FB AF50"
  params: []
```

## Feedbacks
```yaml
# Generic acknowledgement from TV (one of):
- id: ack_okay
  type: enum
  values: [OKAY]
  description: Command accepted. DATA field (4 bytes) follows on Set ack; current state follows on Query ack.
- id: ack_eror
  type: enum
  values: [EROR]
  description: Command rejected / error.
- id: ack_wait
  type: enum
  values: [WAIT]
  description: TV is processing; a follow-up OKAY/EROR ack will follow.

# Per-state query responses (where source documents an enumerated return set):
- id: inpt_state
  type: enum
  values: [TV, AV, Component, HDMI1, HDMI2, HDMI3, HDMI4, VGA]
  description: Current input source. Returned in DATA(4) on INPT? - values: 1=TV, 4=AV, 3=Component, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4, 6=VGA.
  query_command: "INPT????"
- id: pmod_state
  type: enum
  values: [Standard, Vivid, EnergySaving, Theater, Game, Sport]
  description: Current picture mode. Returned in DATA(4) on PMOD? - 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport.
  query_command: "PMOD????"
- id: aspt_state
  type: enum
  values: [Auto, Normal, Zoom, Wide, Direct, Direct1to1, Panoramic, Cinema]
  description: Current aspect ratio. Returned in DATA(4) on ASPT? - 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema.
  query_command: "ASPT????"
- id: mute_state
  type: enum
  values: [not_mute, mute]
  description: Current mute status. Returned in DATA(4) on MUTE? - 0=not mute, 1=mute.
  query_command: "MUTE????"
- id: aspk_state
  type: enum
  values: [off, on]
  description: TV speaker state. Returned in DATA(4) on ASPK? - 0=off, 2=on.
  query_command: "ASPK????"
- id: ovsn_state
  type: enum
  values: [on, off]
  description: Overscan state. Returned in DATA(4) on OVSN? - 0=on, 2=off.
  query_command: "OVSN????"
- id: ctem_state
  type: enum
  values: [High, Middle, MidLow, Low]
  description: Color temperature. Returned in DATA(4) on CTEM? - 0=High, 2=Middle, 3=Mid-Low, 4=Low.
  query_command: "CTEM????"
- id: amod_state
  type: enum
  values: [Standard, Theater, Music, Speech, LateNight]
  description: Sound mode. Returned in DATA(4) on AMOD? - 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night.
  query_command: "AMOD????"
- id: tunr_state
  type: enum
  values: [Antenna, Cable]
  description: Tuner mode. Returned in DATA(4) on TUNR? - 0=Antenna, 2=Cable.
  query_command: "TUNR????"
- id: cc_state
  type: enum
  values: [off, on, on_when_mute]
  description: Closed caption state. Returned in DATA(4) on CC##? - 0=off, 2=on, 3=on when mute.
  query_command: "CC##????"
- id: lang_state
  type: enum
  values: [English, Espanol, Francais]
  description: OSD language. Returned in DATA(4) on LANG? - 0=English, 2=Espanol, 3=Francais.
  query_command: "LANG????"
- id: pled_state
  type: enum
  values: [off, on]
  description: Standby LED. Returned in DATA(4) on PLED? - 0=off, 2=on.
  query_command: "PLED????"
- id: pwre_state
  type: enum
  values: [disabled, enabled]
  description: RS-232 remote power-on enable. Returned in DATA(4) on PWRE? - 0=disabled, 1=enabled.
  query_command: "PWRE????"
- id: pbtn_state
  type: enum
  values: [ac_only, all]
  description: Power off control mode. Returned in DATA(4) on PBTN? - 0=AC only, 1=ALL.
  query_command: "PBTN????"
- id: svol_state
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]
  description: Volume control mode. Returned in DATA(4) on SVOL? - 0=Locked, 1=Last volume, 2=AC reset, 3=Standby reset.
  query_command: "SVOL????"
- id: rmot_state
  type: enum
  values: [enable, disable, partial]
  description: Remote key state. Returned in DATA(4) on RMOT? - 0=Enable, 1=Disable, 2=Partial.
  query_command: "RMOT????"
- id: panl_state
  type: enum
  values: [enable, disable]
  description: Panel key state. Returned in DATA(4) on PANL? - 0=Enable, 1=Disable.
  query_command: "PANL????"
- id: menu_state
  type: enum
  values: [enable, disable]
  description: Menu access state. Returned in DATA(4) on MENU? - 0=Enable, 1=Disable.
  query_command: "MENU????"
- id: avmn_state
  type: enum
  values: [disable, enable]
  description: AV setting menu state. Returned in DATA(4) on AVMN? - 0=Disable, 1=Enable.
  query_command: "AVMN????"
- id: osd_state
  type: enum
  values: [enable, disable]
  description: OSD mode state. Returned in DATA(4) on OSD#? - 0=Enable, 1=Disable.
  query_command: "OSD#????"
- id: inpm_state
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]
  description: Input mode state. Returned in DATA(4) on INPM? - 0=Locked, 1=Selectable, 2=AC reset, 3=Standby reset.
  query_command: "INPM????"
- id: brit_value
  type: integer
  description: Brightness 0..100. Returned in DATA(4) on BRIT?.
  query_command: "BRIT????"
- id: cont_value
  type: integer
  description: Contrast 0..100. Returned in DATA(4) on CONT?.
  query_command: "CONT????"
- id: colr_value
  type: integer
  description: Color saturation 0..100. Returned in DATA(4) on COLR?.
  query_command: "COLR????"
- id: tint_value
  type: integer
  description: Tint 0..100. Returned in DATA(4) on TINT?.
  query_command: "TINT????"
- id: shrp_value
  type: integer
  description: Sharpness 0..20. Returned in DATA(4) on SHRP?.
  query_command: "SHRP????"
- id: volm_value
  type: integer
  description: Volume 0..100. Returned in DATA(4) on VOLM?.
  query_command: "VOLM????"
- id: mavl_value
  type: integer
  description: Max volume 0..100. Returned in DATA(4) on MAVL?.
  query_command: "MAVL????"
- id: vlfl_value
  type: integer
  description: Volume locked level 0..100. Returned in DATA(4) on VLFL?.
  query_command: "VLFL????"
- id: bklv_value
  type: integer
  description: Backlight 0..100. Returned in DATA(4) on BKLV?.
  query_command: "BKLV????"
```

## Variables
```yaml
# Continuous range setters (also exposed as parameterized Actions)
- id: brightness
  type: integer
  range: [0, 100]
  description: Brightness value. Set via BRIT0000..0100; query via BRIT????.
- id: contrast
  type: integer
  range: [0, 100]
  description: Contrast value. Set via CONT0000..0100; query via CONT????.
- id: color_saturation
  type: integer
  range: [0, 100]
  description: Color saturation value. Set via COLR0000..0100; query via COLR????.
- id: tint
  type: integer
  range: [0, 100]
  description: Tint value. Set via TINT0000..0100; query via TINT????.
- id: sharpness
  type: integer
  range: [0, 20]
  description: Sharpness value. Set via SHRP0000..0020; query via SHRP????.
- id: volume
  type: integer
  range: [0, 100]
  description: Volume value. Set via VOLM0000..0100; query via VOLM????.
- id: backlight
  type: integer
  range: [0, 100]
  description: Backlight value. Set via BKLV0000..0100; query via BKLV????.
- id: max_volume
  type: integer
  range: [0, 100]
  description: Maximum volume range. Set via MAVL0000..0100; query via MAVL????.
- id: locked_volume_level
  type: integer
  range: [0, 100]
  description: Volume locked level. Set via VLFL0000..0100; query via VLFL????.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited event/notification frames. Acknowledgement is a
# per-command response; no asynchronous event channel is documented.
```

## Macros
```yaml
# Source example 1 in the protocol section describes a two-step "Power on" sequence:
#   1. S5FAPOWR232  ->  5FA:OKAY####  (enables RS-232 Power On)
#   2. S5FAPOWRON##  ->  5FA:WAIT####  ->  5FA:OKAY####
# This is the documented "Power On" sequence when the TV is in standby and Remote Power-On
# has not been pre-enabled. Implementations may need to issue PWRE0001 once before POWR0001
# will take effect.
- id: power_on_with_remote_enable
  label: Power On (with remote-power-on enable)
  steps:
    - action: pwre_enable
    - action: power_on
  notes: From source Example 1. PWRE0001 must be issued first; without it, POWR0001 from standby is rejected.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on sequencing
# requirements beyond the RS-232 enable step needed for POWR to function. None inferred.
```

## Notes

- **Protocol classification**: this is RS-232 serial only. The "Client ID" 3-byte field uses the last 3 bytes of the TV's Ethernet MAC address, which the source describes as a way to address a specific TV in a multi-TV RS-232 bus. There is no IP/TCP transport in the source; "TCP/IP" in the request prompt appears to refer to the MAC-address field, not the transport itself.
- **Frame size**: 14 bytes fixed (1+3+4+4+1+1). The protocol is case sensitive (source note).
- **Termination**: 0x0D (CR) on every frame; do not append LF.
- **Checksum**: 8-bit checksum appended so that the sum of all bytes in the frame (including the checksum byte) modulo 256 equals 0x00. Implementation must compute, not hard-code.
- **Multi-TV wiring**: source labels section "Connecting to multiple TVs" but the wiring details are described as image content and were not extractable from the refined text. UNRESOLVED.
- **Custom Install menu must be enabled** before the RS-232 port is active. Source procedure: Quick Settings → "7 3 1 0" on remote → scroll to "Custom Installation" → set to "Enable". For remote power-on to work from standby, also set "Power On Command" to "Enable" in the same menu.
- **Discrete IR codes**: source contains a separate 60+ entry table of Pronto-format IR codes (POWER, POWER ON, POWER OFF, INPUT, TV TUNER1, HDMI.1..5, VGA, USB, PICTURE MODE, SOUND MODE, ASPECT RATIO variants, CHANNEL LIST, FAV CHANNEL, SLEEP, TV MENU, HOME, TOOLS, digit 0..9, dash, PREVIOUS CHANNEL, arrows, ENTER, SELECT OK, RETURN, EXIT, INFO, VOLUME ±, CHANNEL ±, PIP toggles, PIP INPUT, PIP SWAP, PIP POSITION, PIP SIZE, Guide, Freeze). These are documented for IR control only and are NOT enumerated in this serial spec.
- **POIS table truncation**: the source's POIS (Power On Input Source) table is truncated at value 3 (Component) in the refined document. Possible additional rows (HDMI1..4, VGA, etc.) not captured.
- **Title page**: source document title is "RS-232/IR Protocol for Hisense® Prosumer TV". The "Models" field on the title page is empty in the refined source. The "5U63KUA" model identifier in this spec is taken from the request prompt, not from a model field within the source.
- **Revision history**: source revision notes document V1.0..V3.6; revision history does not affect protocol surface.
- **Complete source continuation**: the supplied complete source includes POIS0004 (VGA), POIS0005 (HDMI1), POIS0006 (HDMI2), POIS0007 (HDMI3), POIS0008 (HDMI4), POIS????, and the SPKM, B2BM, USBM and PSHF commands appended under Actions. The retained POIS truncation statements describe the original draft's incomplete coverage and are superseded by these additions.
- **Discrete IR coverage amendment**: the 64 documented IR codes are now appended under Actions at the existing discrete input/button granularity. Their command fields preserve source literals, including spaces and `<br>` formatting in COMPLETE HEX CODE cells. These codes require IR transmission; the serial Transport and frame format apply to the serial actions only. Earlier statements that IR codes are not enumerated describe the original draft and are superseded by this amendment. The source directs users to check their specific TV's User Manual for supported IR commands. IR emitter integration is UNRESOLVED; no emitter API, network transport or authentication setting is inferred.

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:42.333Z
last_checked_at: 2026-10-07T17:16:11.114Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T17:16:11.114Z
matched_actions: 278
action_count: 278
confidence: medium
summary: "All 278 action units match source commands, IR codes and query commands, and the transport values are verbatim; the source's empty Models field leaves model applicability to 5U63KUA unconfirmed. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "list any major gaps here"
- "POIS table is truncated in the refined source. Additional input values (HDMI/VGA etc.) may exist; only 0..3 captured here."
- "source describes no unsolicited event/notification frames. Acknowledgement is a"
- "source does not document safety warnings, interlocks, or power-on sequencing"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
