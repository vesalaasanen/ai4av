---
spec_id: admin/hisense-5a53hua
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 5A53HUA Prosumer TV Control Spec"
manufacturer: HiSense
model_family: 5A53HUA
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 5A53HUA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-01T22:10:09.323Z
last_checked_at: 2026-06-02T21:41:53.938Z
generated_at: 2026-06-02T21:41:53.938Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SPKM
  - B2BM
  - USBM
  - PSHF
  - "IP/Ethernet control not documented in source (caller suggested TCP/IP but no IP commands appear in the refined document). Only RS-232 and IR are covered."
  - "any device-initiated notifications not described in source."
  - "no multi-step sequences documented in source."
  - "firmware version compatibility not stated in source."
  - "voltage, current, and power specifications not stated in source."
  - "full list of supported Prosumer TV model numbers — source Models field is blank."
  - "POIS query command not listed in source (only set values 0000-0003 explicit, plus references to INPT-set inputs)."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:53.938Z
  matched_actions: 120
  action_count: 120
  confidence: medium
  summary: "All 120 spec actions confirmed verbatim in source command table; transport 9600 8N1 matches; 4 source commands (SPKM,B2BM,USBM,PSHF) not in spec but count is 4, under the >5 short threshold. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense 5A53HUA Prosumer TV Control Spec

## Summary
RS-232C serial control protocol for the HiSense 5A53HUA Prosumer TV. Frame format: ASCII, 14 bytes fixed length (Operation, Client ID, Command, Data, Checksum, CR). Query commands return ACK with `OKAY`/`EROR`/`WAIT` plus data. Document also covers a discrete IR code set (out of scope for this serial spec).

<!-- UNRESOLVED: IP/Ethernet control not documented in source (caller suggested TCP/IP but no IP commands appear in the refined document). Only RS-232 and IR are covered. -->

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
  connector: DB9 D-sub female on TV
auth:
  type: none  # inferred: no auth/login procedure in source
```

**Frame structure (per source, 14 bytes fixed):**
- OPERATION (1 byte): `S` = Set, `Q` = Query
- CLIENT ID (3 bytes ASCII): `0-9`,`A-F`. For Smart TV use last 3 bytes of Ethernet MAC; for Feature TV use value selected in TV Menu; `ALL` = broadcast.
- COMMAND (4 bytes ASCII, `A-Z`): mnemonic from "Command & Data" table
- DATA (4 bytes ASCII, `0-9`,`A-Z`,`#`,`?`): `????` for queries
- CHECKSUM (1 byte): 8-bit checksum such that the 8-bit sum of the entire command string including the CHECKSUM byte equals `0x00`
- TERMINATION (1 byte): Carriage Return `0x0D`

**ACK from TV:** `<CLIENT_ID>:<ACK><DATA><CHECKSUM><CR>` where ACK is one of `OKAY`, `EROR`, `WAIT`.

## Traits
```yaml
- powerable       # inferred: POWER ON/OFF control present (POWR, PWRE)
- routable        # inferred: input source selection present (INPT, POIS)
- queryable       # inferred: extensive QUERY command set present
- levelable       # inferred: volume/brightness/contrast/sharpness/color/tint/backlight settable
```

## Actions
```yaml
# Frame template:
#   SET:    S<CLIENT_ID><COMMAND><DATA><CKSUM>\r
#   QUERY:  Q<CLIENT_ID><COMMAND>????<CKSUM>\r
# {CLIENT_ID}: 3 ASCII chars (last 3 of MAC, or "ALL")
# {CKSUM}: 1 byte; 8-bit sum of all preceding bytes plus checksum = 0x00
# \r = 0x0D (CR)

- id: pwre_disable
  label: Disable RS-232 Remote Power On
  kind: action
  command: "S{ID}PWRE0000{CKSUM}\r"
  params:
    - name: ID
      type: string
      description: 3-char ASCII client ID
    - name: CKSUM
      type: byte
      description: 1-byte checksum (sum including this byte ≡ 0x00)
  notes: "Function: POWER ON COMMAND ENABLE/QUERY POWER ON COMMAND SETTING"

- id: pwre_enable
  label: Enable RS-232 Remote Power On
  kind: action
  command: "S{ID}PWRE0001{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Must be set to Enable before RS-232 can power the TV on from standby."

- id: powr_standby
  label: Set Power Standby
  kind: action
  command: "S{ID}POWR0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: powr_on
  label: Set Power On
  kind: action
  command: "S{ID}POWR0001{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: inpt_cycle
  label: Input Signal: Change One at a Time
  kind: action
  command: "S{ID}INPT0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: inpt_tv
  label: Set Input Signal: TV
  kind: action
  command: "S{ID}INPT0001{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: inpt_component
  label: Set Input Signal: Component
  kind: action
  command: "S{ID}INPT0003{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: inpt_av
  label: Set Input Signal: AV
  kind: action
  command: "S{ID}INPT0004{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: inpt_vga
  label: Set Input Signal: VGA
  kind: action
  command: "S{ID}INPT0006{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: inpt_hdmi1
  label: Set Input Signal: HDMI1
  kind: action
  command: "S{ID}INPT0009{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: inpt_hdmi2
  label: Set Input Signal: HDMI2
  kind: action
  command: "S{ID}INPT0010{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: inpt_hdmi3
  label: Set Input Signal: HDMI3
  kind: action
  command: "S{ID}INPT0011{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: inpt_hdmi4
  label: Set Input Signal: HDMI4
  kind: action
  command: "S{ID}INPT0012{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: pmod_standard
  label: Set Picture Mode: Standard
  kind: action
  command: "S{ID}PMOD0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: pmod_vivid
  label: Set Picture Mode: Vivid
  kind: action
  command: "S{ID}PMOD0002{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: pmod_energy_saving
  label: Set Picture Mode: EnergySaving
  kind: action
  command: "S{ID}PMOD0003{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: pmod_theater
  label: Set Picture Mode: Theater
  kind: action
  command: "S{ID}PMOD0004{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: pmod_game
  label: Set Picture Mode: Game
  kind: action
  command: "S{ID}PMOD0005{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: pmod_sport
  label: Set Picture Mode: Sport
  kind: action
  command: "S{ID}PMOD0006{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: brit_set
  label: Set Brightness Value
  kind: action
  command: "S{ID}BRIT{value}{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: value
      type: integer
      description: 0-100, 4-digit zero-padded (e.g. 0035, 0100)
    - name: CKSUM
      type: byte

- id: cont_set
  label: Set Contrast Value
  kind: action
  command: "S{ID}CONT{value}{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: value
      type: integer
      description: 0-100, 4-digit zero-padded
    - name: CKSUM
      type: byte

- id: colr_set
  label: Set Color Saturation Value
  kind: action
  command: "S{ID}COLR{value}{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: value
      type: integer
      description: 0-100, 4-digit zero-padded
    - name: CKSUM
      type: byte

- id: tint_set
  label: Set Tint Value
  kind: action
  command: "S{ID}TINT{value}{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: value
      type: integer
      description: 0-100, 4-digit zero-padded
    - name: CKSUM
      type: byte

- id: shrp_set
  label: Set Sharpness Value
  kind: action
  command: "S{ID}SHRP{value}{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: value
      type: integer
      description: 0-20, 4-digit zero-padded
    - name: CKSUM
      type: byte

- id: aspt_auto
  label: Set Aspect Ratio: Auto
  kind: action
  command: "S{ID}ASPT0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: aspt_normal
  label: Set Aspect Ratio: Normal
  kind: action
  command: "S{ID}ASPT0002{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: aspt_zoom
  label: Set Aspect Ratio: Zoom
  kind: action
  command: "S{ID}ASPT0003{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: aspt_wide
  label: Set Aspect Ratio: Wide
  kind: action
  command: "S{ID}ASPT0004{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: aspt_direct
  label: Set Aspect Ratio: Direct
  kind: action
  command: "S{ID}ASPT0005{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: aspt_pixel_map
  label: Set Aspect Ratio: 1-to-1 Pixel Map
  kind: action
  command: "S{ID}ASPT0006{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: aspt_panoramic
  label: Set Aspect Ratio: Panoramic
  kind: action
  command: "S{ID}ASPT0007{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: aspt_cinema
  label: Set Aspect Ratio: Cinema
  kind: action
  command: "S{ID}ASPT0008{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: ovsn_on
  label: Set Overscan: On
  kind: action
  command: "S{ID}OVSN0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: ovsn_off
  label: Set Overscan: Off
  kind: action
  command: "S{ID}OVSN0002{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: rstp_picture
  label: Reset Picture Settings
  kind: action
  command: "S{ID}RSTP1000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: ctem_high
  label: Set Color Temp: High
  kind: action
  command: "S{ID}CTEM0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: ctem_middle
  label: Set Color Temp: Middle
  kind: action
  command: "S{ID}CTEM0002{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: ctem_mid_low
  label: Set Color Temp: Mid-Low
  kind: action
  command: "S{ID}CTEM0003{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: ctem_low
  label: Set Color Temp: Low
  kind: action
  command: "S{ID}CTEM0004{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: bklv_set
  label: Set Backlight Value
  kind: action
  command: "S{ID}BKLV{value}{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: value
      type: integer
      description: 0-100, 4-digit zero-padded
    - name: CKSUM
      type: byte

- id: amod_standard
  label: Set Sound Mode: Standard
  kind: action
  command: "S{ID}AMOD0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: amod_theater
  label: Set Sound Mode: Theater
  kind: action
  command: "S{ID}AMOD0002{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: amod_music
  label: Set Sound Mode: Music
  kind: action
  command: "S{ID}AMOD0003{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: amod_speech
  label: Set Sound Mode: Speech
  kind: action
  command: "S{ID}AMOD0004{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: amod_late_night
  label: Set Sound Mode: Late Night
  kind: action
  command: "S{ID}AMOD0005{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: rsta_audio
  label: Reset Audio Settings
  kind: action
  command: "S{ID}RSTA2000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: volm_set
  label: Set Volume
  kind: action
  command: "S{ID}VOLM{value}{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: value
      type: integer
      description: 0-100, 4-digit zero-padded
    - name: CKSUM
      type: byte

- id: mute_off
  label: Set Mute: Off
  kind: action
  command: "S{ID}MUTE0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: mute_on
  label: Set Mute: On
  kind: action
  command: "S{ID}MUTE0001{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: aspk_off
  label: Set TV Speaker: Off
  kind: action
  command: "S{ID}ASPK0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: aspk_on
  label: Set TV Speaker: On
  kind: action
  command: "S{ID}ASPK0002{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: tunr_antenna
  label: Tuner Mode: Antenna
  kind: action
  command: "S{ID}TUNR0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: tunr_cable
  label: Tuner Mode: Cable
  kind: action
  command: "S{ID}TUNR0002{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: tscn_auto
  label: Automatic Search
  kind: action
  command: "S{ID}TSCN0001{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: chan_down
  label: Channel Down
  kind: action
  command: "S{ID}CHAN0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: chan_up
  label: Channel Up
  kind: action
  command: "S{ID}CHAN0001{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: cc_off
  label: Caption Control: Off
  kind: action
  command: "S{ID}CC##0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Source shows mnemonic as `CC##` (literal two hash characters)."

- id: cc_on
  label: Caption Control: On
  kind: action
  command: "S{ID}CC##0002{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: cc_on_when_mute
  label: Caption Control: On When Mute
  kind: action
  command: "S{ID}CC##0003{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: rset_factory
  label: Restore Factory Settings
  kind: action
  command: "S{ID}RSET9999{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: lang_english
  label: OSD Language: English
  kind: action
  command: "S{ID}LANG0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: lang_spanish
  label: OSD Language: Español
  kind: action
  command: "S{ID}LANG0002{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: lang_french
  label: OSD Language: Français
  kind: action
  command: "S{ID}LANG0003{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: pled_off
  label: Standby LED: Off
  kind: action
  command: "S{ID}PLED0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: pled_on
  label: Standby LED: On
  kind: action
  command: "S{ID}PLED0002{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: bttn_press
  label: Remote Control Button Press
  kind: action
  command: "S{ID}BTTN{code}{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: code
      type: string
      description: |
        4-digit button code. From source:
        1012=POWER, 1000-1009=0-9, 1010=Dash, 1015=FRW<<, 1016=Play, 1017=FFW>>,
        1018=Pause, 1019=Previous, 1020=Stop, 1021=Next>>, 1023=Media Player (HiMedia),
        1024=Sleep, 1027=CC, 1031=Mute, 1032=Vol-, 1033=Vol+, 1034=CH+, 1035=CH-,
        1036=Input, 1038=Menu, 1039=Connected Home (HiSmart), 1040=OK/Enter,
        1041=Up, 1042=Down, 1043=Left, 1044=Right, 1045=Back, 1046=Exit,
        1050=Red, 1051=Green, 1052=Blue, 1053=Yellow, 1054=MTS/SAP, 1055=Live TV
    - name: CKSUM
      type: byte

- id: pbtn_ac_only
  label: Power Off Control Mode: AC Only
  kind: action
  command: "S{ID}PBTN0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: pbtn_all
  label: Power Off Control Mode: All
  kind: action
  command: "S{ID}PBTN0001{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: mavl_set
  label: Set Volume Range
  kind: action
  command: "S{ID}MAVL{value}{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: value
      type: integer
      description: 0-100, 4-digit zero-padded
    - name: CKSUM
      type: byte

- id: svol_locked
  label: Volume Control: Locked
  kind: action
  command: "S{ID}SVOL0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: svol_last
  label: Volume Control: Last Volume
  kind: action
  command: "S{ID}SVOL0001{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: svol_ac_reset
  label: Volume Control: AC Reset
  kind: action
  command: "S{ID}SVOL0002{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: svol_standby_reset
  label: Volume Control: Standby Reset
  kind: action
  command: "S{ID}SVOL0003{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: vlfl_set
  label: Set Volume Locked Level
  kind: action
  command: "S{ID}VLFL{value}{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: value
      type: integer
      description: 0-100, 4-digit zero-padded
    - name: CKSUM
      type: byte

- id: rmot_enable
  label: Remote Key: Enable
  kind: action
  command: "S{ID}RMOT0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: rmot_disable
  label: Remote Key: Disable
  kind: action
  command: "S{ID}RMOT0001{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: rmot_partial
  label: Remote Key: Partial
  kind: action
  command: "S{ID}RMOT0002{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: panl_enable
  label: Panel Key: Enable
  kind: action
  command: "S{ID}PANL0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: panl_disable
  label: Panel Key: Disable
  kind: action
  command: "S{ID}PANL0001{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: menu_enable
  label: Menu Access: Enable
  kind: action
  command: "S{ID}MENU0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: menu_disable
  label: Menu Access: Disable
  kind: action
  command: "S{ID}MENU0001{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: avmn_disable
  label: AV Setting Menu: Disable
  kind: action
  command: "S{ID}AVMN0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: avmn_enable
  label: AV Setting Menu: Enable
  kind: action
  command: "S{ID}AVMN0001{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: osd_enable
  label: OSD Mode: Enable
  kind: action
  command: "S{ID}OSD#0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Source shows mnemonic as `OSD#` (literal hash character)."

- id: osd_disable
  label: OSD Mode: Disable
  kind: action
  command: "S{ID}OSD#0001{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: inpm_locked
  label: Input Mode: Locked
  kind: action
  command: "S{ID}INPM0000{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: inpm_selectable
  label: Input Mode: Selectable
  kind: action
  command: "S{ID}INPM0001{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: inpm_ac_reset
  label: Input Mode: AC Reset
  kind: action
  command: "S{ID}INPM0002{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: inpm_standby_reset
  label: Input Mode: Standby Reset
  kind: action
  command: "S{ID}INPM0003{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte

- id: pois_set
  label: Set Power-On Input Source
  kind: action
  command: "S{ID}POIS{value}{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: value
      type: string
      description: |
        4-digit value. From source: 0000=LAST, 0001=Air, 0002=AV, 0003=Component.
        Additional input values (HDMI1..HDMI4, VGA, etc.) are listed in INPT command set.
    - name: CKSUM
      type: byte

# === QUERIES ===
- id: query_pwre
  label: Query Power On Command Setting
  kind: query
  command: "Q{ID}PWRE????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Disable, 1=Enable. Per source V3.1 note, not available in STANDBY mode."

- id: query_inpt
  label: Query Current Input Source
  kind: query
  command: "Q{ID}INPT????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4."

- id: query_pmod
  label: Query Picture Mode
  kind: query
  command: "Q{ID}PMOD????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport."

- id: query_brit
  label: Query Brightness Value
  kind: query
  command: "Q{ID}BRIT????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0-100."

- id: query_cont
  label: Query Contrast Value
  kind: query
  command: "Q{ID}CONT????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0-100."

- id: query_colr
  label: Query Color Saturation Value
  kind: query
  command: "Q{ID}COLR????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0-100."

- id: query_tint
  label: Query Tint Value
  kind: query
  command: "Q{ID}TINT????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0-100."

- id: query_shrp
  label: Query Sharpness Value
  kind: query
  command: "Q{ID}SHRP????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0-20."

- id: query_aspt
  label: Query Current Aspect Ratio
  kind: query
  command: "Q{ID}ASPT????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema."

- id: query_ovsn
  label: Query Overscan
  kind: query
  command: "Q{ID}OVSN????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=On, 2=Off."

- id: query_ctem
  label: Query Color Temp
  kind: query
  command: "Q{ID}CTEM????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=High, 2=Middle, 3=Mid-Low, 4=Low."

- id: query_bklv
  label: Query Backlight Value
  kind: query
  command: "Q{ID}BKLV????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0-100."

- id: query_amod
  label: Query Sound Mode
  kind: query
  command: "Q{ID}AMOD????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night."

- id: query_volm
  label: Query Current Volume
  kind: query
  command: "Q{ID}VOLM????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0-100."

- id: query_mute
  label: Query Mute Status
  kind: query
  command: "Q{ID}MUTE????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Not Mute, 1=Mute."

- id: query_aspk
  label: Query TV Speaker
  kind: query
  command: "Q{ID}ASPK????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Off, 2=On."

- id: query_tunr
  label: Query Tuner Mode
  kind: query
  command: "Q{ID}TUNR????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Antenna, 2=Cable."

- id: query_cc
  label: Query Caption Control
  kind: query
  command: "Q{ID}CC##????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Off, 2=On, 3=On when mute. Mnemonic contains literal `##`."

- id: query_lang
  label: Query OSD Language
  kind: query
  command: "Q{ID}LANG????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=English, 2=Español, 3=Français."

- id: query_pled
  label: Query Standby LED
  kind: query
  command: "Q{ID}PLED????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Off, 2=On."

- id: query_pbtn
  label: Query Power Off Control Mode
  kind: query
  command: "Q{ID}PBTN????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=AC Only, 1=All."

- id: query_mavl
  label: Query Volume Range
  kind: query
  command: "Q{ID}MAVL????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0-100."

- id: query_svol
  label: Query Volume Control
  kind: query
  command: "Q{ID}SVOL????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset."

- id: query_vlfl
  label: Query Volume Locked Level
  kind: query
  command: "Q{ID}VLFL????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0-100."

- id: query_rmot
  label: Query Remote Key
  kind: query
  command: "Q{ID}RMOT????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Enable, 1=Disable, 2=Partial."

- id: query_panl
  label: Query Panel Key
  kind: query
  command: "Q{ID}PANL????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Enable, 1=Disable."

- id: query_menu
  label: Query Menu Access
  kind: query
  command: "Q{ID}MENU????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Enable, 1=Disable."

- id: query_avmn
  label: Query AV Setting Menu
  kind: query
  command: "Q{ID}AVMN????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Disable, 1=Enable."

- id: query_osd
  label: Query OSD Mode
  kind: query
  command: "Q{ID}OSD#????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Enable, 1=Disable. Mnemonic contains literal `#`."

- id: query_inpm
  label: Query Input Mode
  kind: query
  command: "Q{ID}INPM????{CKSUM}\r"
  params:
    - name: ID
      type: string
    - name: CKSUM
      type: byte
  notes: "Returns 0=Locked, 1=Selectable, 2=AC Reset, 3=Standby Reset."
```

## Feedbacks
```yaml
- id: power_on_command_enable
  type: enum
  values: [disable, enable]
  source_query: query_pwre
- id: input_source
  type: enum
  values: [tv, av, component, vga, hdmi1, hdmi2, hdmi3, hdmi4]
  source_query: query_inpt
- id: picture_mode
  type: enum
  values: [standard, vivid, energy_saving, theater, game, sport]
  source_query: query_pmod
- id: aspect_ratio
  type: enum
  values: [auto, normal, zoom, wide, direct, pixel_map, panoramic, cinema]
  source_query: query_aspt
- id: overscan
  type: enum
  values: [on, off]
  source_query: query_ovsn
- id: color_temp
  type: enum
  values: [high, middle, mid_low, low]
  source_query: query_ctem
- id: sound_mode
  type: enum
  values: [standard, theater, music, speech, late_night]
  source_query: query_amod
- id: mute_state
  type: enum
  values: [not_mute, mute]
  source_query: query_mute
- id: tv_speaker
  type: enum
  values: [off, on]
  source_query: query_aspk
- id: tuner_mode
  type: enum
  values: [antenna, cable]
  source_query: query_tunr
- id: caption_control
  type: enum
  values: [off, on, on_when_mute]
  source_query: query_cc
- id: osd_language
  type: enum
  values: [english, spanish, french]
  source_query: query_lang
- id: standby_led
  type: enum
  values: [off, on]
  source_query: query_pled
- id: power_off_control_mode
  type: enum
  values: [ac_only, all]
  source_query: query_pbtn
- id: volume_control
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]
  source_query: query_svol
- id: remote_key_lock
  type: enum
  values: [enable, disable, partial]
  source_query: query_rmot
- id: panel_key_lock
  type: enum
  values: [enable, disable]
  source_query: query_panl
- id: menu_access
  type: enum
  values: [enable, disable]
  source_query: query_menu
- id: av_setting_menu
  type: enum
  values: [disable, enable]
  source_query: query_avmn
- id: osd_mode
  type: enum
  values: [enable, disable]
  source_query: query_osd
- id: input_mode
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]
  source_query: query_inpm
```

## Variables
```yaml
- id: brightness
  type: integer
  range: [0, 100]
  setter: brit_set
  query: query_brit
- id: contrast
  type: integer
  range: [0, 100]
  setter: cont_set
  query: query_cont
- id: color_saturation
  type: integer
  range: [0, 100]
  setter: colr_set
  query: query_colr
- id: tint
  type: integer
  range: [0, 100]
  setter: tint_set
  query: query_tint
- id: sharpness
  type: integer
  range: [0, 20]
  setter: shrp_set
  query: query_shrp
- id: backlight
  type: integer
  range: [0, 100]
  setter: bklv_set
  query: query_bklv
- id: volume
  type: integer
  range: [0, 100]
  setter: volm_set
  query: query_volm
- id: volume_range
  type: integer
  range: [0, 100]
  setter: mavl_set
  query: query_mavl
- id: volume_locked_level
  type: integer
  range: [0, 100]
  setter: vlfl_set
  query: query_vlfl
```

## Events
```yaml
# RS-232 is request/response - no unsolicited events documented in source.
# UNRESOLVED: any device-initiated notifications not described in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - rset_factory        # Restore Factory Settings - wipes all user config
  - tscn_auto           # Automatic Search - rescans tuner channels
interlocks:
  - description: |
      RS-232 port must be enabled in the TV's Custom Install menu before any
      serial command will be accepted. Procedure (per source):
      1. Power on TV, press Quick Settings Menu on remote.
      2. Enter "7 3 1 0" on the number pad to open Custom Install menu.
      3. Scroll to "Custom Installation", set to Enable (Left/Right arrow, then OK).
      4. For RS-232 power-on from standby, also set "Power On Command" to Enable.
  - description: |
      Protocol is case-sensitive. All command mnemonics and data must be
      uppercase ASCII.
```

## Notes
- Source document title is "RS-232/IR Protocol for Hisense® Prosumer TV" (V3.6, 17-Apr-2017). Models field lists 5A53HUA among supported Prosumer TV series.
- Physical interface: DB9 D-sub female on TV chassis. Pinout per source: 1=RI, 2=TXD, 3=RXD, 4=DSR, 5=GND, 6=DTR, 7=CTS, 8=RTS, 9=Power Input/DCD. Use a straight-through or USB-to-serial cable (sold separately).
- Checksum algorithm: 8-bit sum of all preceding bytes (S or Q + 3-byte ID + 4-byte command + 4-byte data) plus the checksum byte itself = `0x00`. Equivalently, checksum = two's complement (mod 256) of the 8-bit sum of all preceding bytes.
- Example literal command (ASCII): `S5FAPOWR0001<cksum>\r`. Example literal hex: `53 35 46 41 50 4F 57 52 30 30 30 31 05 0D`.
- ACK payload (ASCII): `5FA:OKAY####<cksum>\r` where `####` carries query response data.
- Generic "broadcast" client ID is `ALL` per source.
- This document also defines a discrete IR code set (Presto CCF format, low custom 04FB, function codes 70-99 and 70-A9 hex range covering HDMI1..HDMI4, VGA, USB, picture/sound modes, aspect ratios, digits, arrows, volume/channel, PIP, transport, etc.). IR is one-way and not part of this RS-232 spec.
- Caller suggested "Known protocol: TCP/IP" but the source document only documents RS-232 and IR. No IP-based command set is present in the refined source.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: voltage, current, and power specifications not stated in source. -->
<!-- UNRESOLVED: full list of supported Prosumer TV model numbers — source Models field is blank. -->
<!-- UNRESOLVED: POIS query command not listed in source (only set values 0000-0003 explicit, plus references to INPT-set inputs). -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-01T22:10:09.323Z
last_checked_at: 2026-06-02T21:41:53.938Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:53.938Z
matched_actions: 120
action_count: 120
confidence: medium
summary: "All 120 spec actions confirmed verbatim in source command table; transport 9600 8N1 matches; 4 source commands (SPKM,B2BM,USBM,PSHF) not in spec but count is 4, under the >5 short threshold. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- SPKM
- B2BM
- USBM
- PSHF
- "IP/Ethernet control not documented in source (caller suggested TCP/IP but no IP commands appear in the refined document). Only RS-232 and IR are covered."
- "any device-initiated notifications not described in source."
- "no multi-step sequences documented in source."
- "firmware version compatibility not stated in source."
- "voltage, current, and power specifications not stated in source."
- "full list of supported Prosumer TV model numbers — source Models field is blank."
- "POIS query command not listed in source (only set values 0000-0003 explicit, plus references to INPT-set inputs)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
