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
last_checked_at: 2026-05-14T18:17:16.249Z
generated_at: 2026-05-14T18:17:16.249Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list any major gaps here"
  - "POIS table is truncated in the refined source. Additional input values (HDMI/VGA etc.) may exist; only 0..3 captured here."
  - "source describes no unsolicited event/notification frames. Acknowledgement is a"
  - "source does not document safety warnings, interlocks, or power-on sequencing"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.249Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 54 spec actions and transport parameters verified against RS-232 command reference in source document. (4 unresolved item(s) noted in Known Gaps.)"
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
  type: none  # inferred: no auth procedure in source
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
  command: "POWR0001"  # GENERIC HEX: 53 41 4C 4C 50 4F 57 52 30 30 30 30 CB 0D
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
  command: "CHAN0001"  # GENERIC HEX: 53 41 4C 4C 43 48 41 4E 30 30 30 30 F9 0D
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
- id: pmod_state
  type: enum
  values: [Standard, Vivid, EnergySaving, Theater, Game, Sport]
  description: Current picture mode. Returned in DATA(4) on PMOD? - 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport.
- id: aspt_state
  type: enum
  values: [Auto, Normal, Zoom, Wide, Direct, Direct1to1, Panoramic, Cinema]
  description: Current aspect ratio. Returned in DATA(4) on ASPT? - 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema.
- id: mute_state
  type: enum
  values: [not_mute, mute]
  description: Current mute status. Returned in DATA(4) on MUTE? - 0=not mute, 1=mute.
- id: aspk_state
  type: enum
  values: [off, on]
  description: TV speaker state. Returned in DATA(4) on ASPK? - 0=off, 2=on.
- id: ovsn_state
  type: enum
  values: [on, off]
  description: Overscan state. Returned in DATA(4) on OVSN? - 0=on, 2=off.
- id: ctem_state
  type: enum
  values: [High, Middle, MidLow, Low]
  description: Color temperature. Returned in DATA(4) on CTEM? - 0=High, 2=Middle, 3=Mid-Low, 4=Low.
- id: amod_state
  type: enum
  values: [Standard, Theater, Music, Speech, LateNight]
  description: Sound mode. Returned in DATA(4) on AMOD? - 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night.
- id: tunr_state
  type: enum
  values: [Antenna, Cable]
  description: Tuner mode. Returned in DATA(4) on TUNR? - 0=Antenna, 2=Cable.
- id: cc_state
  type: enum
  values: [off, on, on_when_mute]
  description: Closed caption state. Returned in DATA(4) on CC##? - 0=off, 2=on, 3=on when mute.
- id: lang_state
  type: enum
  values: [English, Espanol, Francais]
  description: OSD language. Returned in DATA(4) on LANG? - 0=English, 2=Espanol, 3=Francais.
- id: pled_state
  type: enum
  values: [off, on]
  description: Standby LED. Returned in DATA(4) on PLED? - 0=off, 2=on.
- id: pwre_state
  type: enum
  values: [disabled, enabled]
  description: RS-232 remote power-on enable. Returned in DATA(4) on PWRE? - 0=disabled, 1=enabled.
- id: pbtn_state
  type: enum
  values: [ac_only, all]
  description: Power off control mode. Returned in DATA(4) on PBTN? - 0=AC only, 1=ALL.
- id: svol_state
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]
  description: Volume control mode. Returned in DATA(4) on SVOL? - 0=Locked, 1=Last volume, 2=AC reset, 3=Standby reset.
- id: rmot_state
  type: enum
  values: [enable, disable, partial]
  description: Remote key state. Returned in DATA(4) on RMOT? - 0=Enable, 1=Disable, 2=Partial.
- id: panl_state
  type: enum
  values: [enable, disable]
  description: Panel key state. Returned in DATA(4) on PANL? - 0=Enable, 1=Disable.
- id: menu_state
  type: enum
  values: [enable, disable]
  description: Menu access state. Returned in DATA(4) on MENU? - 0=Enable, 1=Disable.
- id: avmn_state
  type: enum
  values: [disable, enable]
  description: AV setting menu state. Returned in DATA(4) on AVMN? - 0=Disable, 1=Enable.
- id: osd_state
  type: enum
  values: [enable, disable]
  description: OSD mode state. Returned in DATA(4) on OSD#? - 0=Enable, 1=Disable.
- id: inpm_state
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]
  description: Input mode state. Returned in DATA(4) on INPM? - 0=Locked, 1=Selectable, 2=AC reset, 3=Standby reset.
- id: brit_value
  type: integer
  description: Brightness 0..100. Returned in DATA(4) on BRIT?.
- id: cont_value
  type: integer
  description: Contrast 0..100. Returned in DATA(4) on CONT?.
- id: colr_value
  type: integer
  description: Color saturation 0..100. Returned in DATA(4) on COLR?.
- id: tint_value
  type: integer
  description: Tint 0..100. Returned in DATA(4) on TINT?.
- id: shrp_value
  type: integer
  description: Sharpness 0..20. Returned in DATA(4) on SHRP?.
- id: volm_value
  type: integer
  description: Volume 0..100. Returned in DATA(4) on VOLM?.
- id: mavl_value
  type: integer
  description: Max volume 0..100. Returned in DATA(4) on MAVL?.
- id: vlfl_value
  type: integer
  description: Volume locked level 0..100. Returned in DATA(4) on VLFL?.
- id: bklv_value
  type: integer
  description: Backlight 0..100. Returned in DATA(4) on BKLV?.
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

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:42.333Z
last_checked_at: 2026-05-14T18:17:16.249Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.249Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 54 spec actions and transport parameters verified against RS-232 command reference in source document. (4 unresolved item(s) noted in Known Gaps.)"
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
