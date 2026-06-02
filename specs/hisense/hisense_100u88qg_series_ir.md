---
spec_id: admin/hisense-100u88qg-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 100U88QG Series RS-232/IR Control Spec"
manufacturer: HiSense
model_family: "100U88QG Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "100U88QG Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-01T20:34:35.932Z
last_checked_at: 2026-05-14T18:17:16.007Z
generated_at: 2026-05-14T18:17:16.007Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "protocol revision V3.6 (17-Apr-2017) is the latest; specific firmware mapping per sub-model is not stated in source."
  - "no auth/login/password procedure described in source."
  - "TCP/IP port, HTTP base URL, OSC endpoint — not documented in source; no IP control protocol is described even though the TV has a MAC address."
  - "source does not describe any unsolicited asynchronous"
  - "source does not document any multi-step macro sequences;"
  - "source does not describe explicit safety warnings, interlock"
  - "no IP / network control protocol (TCP port, HTTP base URL, REST endpoints, OSC, UDP) is described anywhere in the source — the only machine control surface is RS-232 plus discrete IR. The presence of a MAC address implies Ethernet, but the protocol on top of Ethernet is not documented."
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.007Z
  matched_actions: 39
  action_count: 44
  confidence: medium
  summary: "All spec actions matched literally in source; transport verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense 100U88QG Series RS-232/IR Control Spec

## Summary
RS-232 and discrete-IR control protocol for the HiSense Prosumer TV (100U88QG Series). The TV exposes a female DB9 RS-232C port (9600 8N1, no flow control, ASCII) and accepts a fixed-length framed command set for Set/Query of power, input, picture, sound, tuner, caption, language, lock, and system settings. Discrete-IR codes are also documented (NEC-format hex with Pronto CCF).

<!-- UNRESOLVED: protocol revision V3.6 (17-Apr-2017) is the latest; specific firmware mapping per sub-model is not stated in source. -->

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
  # UNRESOLVED: no auth/login/password procedure described in source.
  # Code, therefore auth.type cannot be set with confidence; left as "none" by inference.
auth:
  type: none  # inferred: no auth procedure in source
```

**RS-232C frame format (fixed length, ASCII):**

```
Set:    S [CLIENT_ID 3B] [COMMAND 4B] [DATA 4B] [CHECKSUM 1B] \r
Query:  Q [CLIENT_ID 3B] [COMMAND 4B] ????      [CHECKSUM 1B] \r
Ack:    [CLIENT_ID 3B] : [OKAY|EROR|WAIT] [DATA 4B] [CHECKSUM 1B] \r
```

- `CLIENT_ID` = 3 chars `0-9,A-F`. Smart TV = last 3 bytes of MAC. `ALL` = broadcast.
- `CHECKSUM` = 8-bit checksum such that the sum of all bytes (including CHECKSUM) equals `0x00`.
- `TERMINATION` = Carriage Return, hex `0x0D`.
- `OPERATION DIRECTION` = `S` for Set, `Q` for Query. The protocol is case sensitive.

**Physical:** Female DB9 D-sub on TV. Pinout: 1=RI, 2=TXD, 3=RXD, 4=DSR, 5=GND, 6=DTR, 7=CTS, 8=RTS, 9=Power Input/DCD. Connect to PC/USB controller via USB-to-Serial adapter (sold separately).

**Setup:** Custom Install menu must be enabled (press Quick Settings, enter `7 3 1 0` on remote, set Custom Installation → Enable). For standby power-on via RS-232, set Power On Command → Enable.

<!-- UNRESOLVED: TCP/IP port, HTTP base URL, OSC endpoint — not documented in source; no IP control protocol is described even though the TV has a MAC address. -->

## Traits
```yaml
- powerable       # inferred: power on/off commands present (POWR, PWRE)
- routable        # inferred: input select commands present (INPT, INPM, POIS)
- queryable       # inferred: query commands returning state present (INPT????, PMOD????, etc.)
- levelable       # inferred: volume / brightness / contrast / tint / sharpness / backlight commands present
```

## Actions

```yaml
# === RS-232 — Power ===
- id: pwre_set
  label: "Power On Command Enable (RS-232 remote boot)"
  kind: action
  command: "S{client_id}PWRE{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0000 = disable RS-232 remote power on; 0001 = enable RS-232 remote power on"
    - name: client_id
      type: string
      description: "3-byte client ID, e.g. ALL or last 3 bytes of TV MAC"
    - name: checksum
      type: string
      description: "8-bit checksum such that sum of all bytes (incl. checksum) = 0x00"

- id: pwre_query
  label: "Query Power On Command Setting"
  kind: query
  command: "Q{client_id}PWRE????{checksum}\r"
  notes: "Not available in STANDBY mode (per revision V3.1)."
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: powr_set
  label: "Set Power On/Off"
  kind: action
  command: "S{client_id}POWR{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0000 = standby; 0001 = power on"
    - name: client_id
      type: string
    - name: checksum
      type: string

# === RS-232 — Input ===
- id: inpt_set
  label: "Set Input Source"
  kind: action
  command: "S{client_id}INPT{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum:
        - "0000"  # Change Input Signal One at a Time (next)
        - "0001"  # TV
        - "0003"  # Component
        - "0004"  # AV
        - "0006"  # VGA
        - "0009"  # HDMI1
        - "0010"  # HDMI2
        - "0011"  # HDMI3
        - "0012"  # HDMI4
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: inpt_query
  label: "Query Current Input Source"
  kind: query
  command: "Q{client_id}INPT????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

# === RS-232 — Picture ===
- id: pmod_set
  label: "Set Picture Mode"
  kind: action
  command: "S{client_id}PMOD{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0002", "0003", "0004", "0005", "0006"]
      description: "0000=Standard, 0002=Vivid, 0003=EnergySaving, 0004=Theater, 0005=Game, 0006=Sport"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: pmod_query
  label: "Query Picture Mode"
  kind: query
  command: "Q{client_id}PMOD????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: brit_set
  label: "Set Brightness"
  kind: action
  command: "S{client_id}BRIT{data}{checksum}\r"
  params:
    - name: data
      type: string
      description: "0000-0100 (0-100)"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: brit_query
  label: "Query Brightness"
  kind: query
  command: "Q{client_id}BRIT????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: cont_set
  label: "Set Contrast"
  kind: action
  command: "S{client_id}CONT{data}{checksum}\r"
  params:
    - name: data
      type: string
      description: "0000-0100 (0-100)"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: cont_query
  label: "Query Contrast"
  kind: query
  command: "Q{client_id}CONT????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: colr_set
  label: "Set Color Saturation"
  kind: action
  command: "S{client_id}COLR{data}{checksum}\r"
  params:
    - name: data
      type: string
      description: "0000-0100 (0-100)"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: colr_query
  label: "Query Color Saturation"
  kind: query
  command: "Q{client_id}COLR????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: tint_set
  label: "Set Tint"
  kind: action
  command: "S{client_id}TINT{data}{checksum}\r"
  params:
    - name: data
      type: string
      description: "0000-0100 (0-100)"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: tint_query
  label: "Query Tint"
  kind: query
  command: "Q{client_id}TINT????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: shrp_set
  label: "Set Sharpness"
  kind: action
  command: "S{client_id}SHRP{data}{checksum}\r"
  params:
    - name: data
      type: string
      description: "0000-0020 (0-20)"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: shrp_query
  label: "Query Sharpness"
  kind: query
  command: "Q{client_id}SHRP????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: aspt_set
  label: "Set Aspect Ratio"
  kind: action
  command: "S{client_id}ASPT{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0002", "0003", "0004", "0005", "0006", "0007", "0008"]
      description: "0000=Auto, 0002=Normal, 0003=Zoom, 0004=Wide, 0005=Direct, 0006=1-to-1 pixel map, 0007=Panoramic, 0008=Cinema"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: aspt_query
  label: "Query Aspect Ratio"
  kind: query
  command: "Q{client_id}ASPT????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: ovsn_set
  label: "Set Overscan"
  kind: action
  command: "S{client_id}OVSN{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0002"]
      description: "0000=On, 0002=Off"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: ovsn_query
  label: "Query Overscan"
  kind: query
  command: "Q{client_id}OVSN????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: rstp_set
  label: "Reset Picture Settings"
  kind: action
  command: "S{client_id}RSTP1000{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: ctem_set
  label: "Set Color Temperature"
  kind: action
  command: "S{client_id}CTEM{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0002", "0003", "0004"]
      description: "0000=High, 0002=Middle, 0003=Mid-Low, 0004=Low"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: ctem_query
  label: "Query Color Temperature"
  kind: query
  command: "Q{client_id}CTEM????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: bklv_set
  label: "Set Backlight"
  kind: action
  command: "S{client_id}BKLV{data}{checksum}\r"
  params:
    - name: data
      type: string
      description: "0000-0100 (0-100)"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: bklv_query
  label: "Query Backlight"
  kind: query
  command: "Q{client_id}BKLV????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

# === RS-232 — Sound ===
- id: amod_set
  label: "Set Sound Mode"
  kind: action
  command: "S{client_id}AMOD{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0002", "0003", "0004", "0005"]
      description: "0000=Standard, 0002=Theater, 0003=Music, 0004=Speech, 0005=Late night"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: amod_query
  label: "Query Sound Mode"
  kind: query
  command: "Q{client_id}AMOD????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: rsta_set
  label: "Reset Audio Settings"
  kind: action
  command: "S{client_id}RSTA2000{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: volm_set
  label: "Set Volume"
  kind: action
  command: "S{client_id}VOLM{data}{checksum}\r"
  params:
    - name: data
      type: string
      description: "0000-0100 (0-100)"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: volm_query
  label: "Query Volume"
  kind: query
  command: "Q{client_id}VOLM????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: mute_set
  label: "Set Mute"
  kind: action
  command: "S{client_id}MUTE{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0000=Off, 0001=On"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: mute_query
  label: "Query Mute"
  kind: query
  command: "Q{client_id}MUTE????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: aspk_set
  label: "Set TV Speaker"
  kind: action
  command: "S{client_id}ASPK{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0002"]
      description: "0000=Off, 0002=On (per revision V3.1, [ARC] added to SPKM query)"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: aspk_query
  label: "Query TV Speaker"
  kind: query
  command: "Q{client_id}ASPK????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

# === RS-232 — Tuner / Channel ===
- id: tunr_set
  label: "Set Tuner Mode"
  kind: action
  command: "S{client_id}TUNR{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0002"]
      description: "0000=Antenna, 0002=Cable"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: tunr_query
  label: "Query Tuner Mode"
  kind: query
  command: "Q{client_id}TUNR????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: tscn_set
  label: "Automatic Channel Search"
  kind: action
  command: "S{client_id}TSCN0001{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: chan_set
  label: "Channel Step"
  kind: action
  command: "S{client_id}CHAN{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0000=Channel down, 0001=Channel up"
    - name: client_id
      type: string
    - name: checksum
      type: string

# === RS-232 — Caption / Language / System ===
- id: cc_set
  label: "Set Caption Control"
  kind: action
  command: "S{client_id}CC##{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0002", "0003"]
      description: "0000=CC off, 0002=CC on, 0003=CC on when mute"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: cc_query
  label: "Query Caption Control"
  kind: query
  command: "Q{client_id}CC##????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: rset_set
  label: "Restore Factory Settings"
  kind: action
  command: "S{client_id}RSET9999{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: lang_set
  label: "Set OSD Language"
  kind: action
  command: "S{client_id}LANG{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0002", "0003"]
      description: "0000=English, 0002=Español, 0003=Français"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: lang_query
  label: "Query OSD Language"
  kind: query
  command: "Q{client_id}LANG????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: pled_set
  label: "Set Standby LED"
  kind: action
  command: "S{client_id}PLED{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0002"]
      description: "0000=Off, 0002=On"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: pled_query
  label: "Query Standby LED"
  kind: query
  command: "Q{client_id}PLED????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: bttn_set
  label: "Remote Control Button Simulator"
  kind: action
  command: "S{client_id}BTTN{button_id}{checksum}\r"
  params:
    - name: button_id
      type: string
      description: "4-digit button code; see `Notes` for the full list of supported buttons and their codes (e.g. 1000=0, 1001=1, ..., 1012=POWER, 1031=MUTE, 1032=VOL-, 1033=VOL+, 1034=CH+, 1035=CH-, 1036=INPUT, 1038=MENU, 1040=OK/ENTER, 1045=BACK, 1046=EXIT, 1050=Red, 1051=Green, 1052=Blue, 1053=Yellow, 1054=MTS/SAP, 1055=Live TV, etc.)."
    - name: client_id
      type: string
    - name: checksum
      type: string

# === RS-232 — Power-on / Lock / Menu policy ===
- id: pbtn_set
  label: "Set Power Off Control Mode"
  kind: action
  command: "S{client_id}PBTN{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0000=AC ONLY, 0001=ALL"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: pbtn_query
  label: "Query Power Off Control Mode"
  kind: query
  command: "Q{client_id}PBTN????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: mavl_set
  label: "Set Volume Range (Max)"
  kind: action
  command: "S{client_id}MAVL{data}{checksum}\r"
  params:
    - name: data
      type: string
      description: "0000-0100 (0-100)"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: mavl_query
  label: "Query Volume Range"
  kind: query
  command: "Q{client_id}MAVL????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: svol_set
  label: "Set Volume Control Mode"
  kind: action
  command: "S{client_id}SVOL{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0001", "0002", "0003"]
      description: "0000=LOCKED, 0001=LAST VOLUME, 0002=AC RESET, 0003=STANDBY RESET"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: svol_query
  label: "Query Volume Control Mode"
  kind: query
  command: "Q{client_id}SVOL????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: vlfl_set
  label: "Set Volume Locked Level"
  kind: action
  command: "S{client_id}VLFL{data}{checksum}\r"
  params:
    - name: data
      type: string
      description: "0000-0100 (0-100)"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: vlfl_query
  label: "Query Volume Locked Level"
  kind: query
  command: "Q{client_id}VLFL????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: rmot_set
  label: "Set Remote Key"
  kind: action
  command: "S{client_id}RMOT{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0001", "0002"]
      description: "0000=ENABLE, 0001=DISABLE, 0002=PARTIAL"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: rmot_query
  label: "Query Remote Key"
  kind: query
  command: "Q{client_id}RMOT????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: panl_set
  label: "Set Panel Key"
  kind: action
  command: "S{client_id}PANL{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0000=ENABLE, 0001=DISABLE"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: panl_query
  label: "Query Panel Key"
  kind: query
  command: "Q{client_id}PANL????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: menu_set
  label: "Set Menu Access"
  kind: action
  command: "S{client_id}MENU{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0000=ENABLE, 0001=DISABLE"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: menu_query
  label: "Query Menu Access"
  kind: query
  command: "Q{client_id}MENU????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: avmn_set
  label: "Set AV Setting Menu"
  kind: action
  command: "S{client_id}AVMN{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0000=DISABLE, 0001=ENABLE"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: avmn_query
  label: "Query AV Setting Menu"
  kind: query
  command: "Q{client_id}AVMN????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: osd_set
  label: "Set OSD Mode"
  kind: action
  command: "S{client_id}OSD#{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0000=ENABLE, 0001=DISABLE"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: osd_query
  label: "Query OSD Mode"
  kind: query
  command: "Q{client_id}OSD#????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: inpm_set
  label: "Set Input Mode"
  kind: action
  command: "S{client_id}INPM{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0001", "0002", "0003"]
      description: "0000=LOCKED, 0001=SELECTABLE, 0002=AC RESET, 0003=STANDBY RESET"
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: inpm_query
  label: "Query Input Mode"
  kind: query
  command: "Q{client_id}INPM????{checksum}\r"
  params:
    - name: client_id
      type: string
    - name: checksum
      type: string

- id: pois_set
  label: "Set Power On Input Selection"
  kind: action
  command: "S{client_id}POIS{data}{checksum}\r"
  params:
    - name: data
      type: string
      enum: ["0000", "0001", "0002", "0003"]
      description: "0000=LAST, 0001=Air, 0002=AV, 0003=Component (additional values for HDMI/VGA etc. may exist; full list truncated in source)."
    - name: client_id
      type: string
    - name: checksum
      type: string

# === Discrete IR Codes (NEC-format hex; full Pronto CCF in source) ===
# IR protocol is NEC-format 38 kHz carrier; the 4-byte code = [04][FB][data][~data].
# Each entry is one distinct function as documented in the source.
# `command:` carries the complete 4-byte hex code, space-separated.

- id: ir_power_toggle
  label: "IR Power Toggle"
  kind: action
  command: "04 FB 70 8F"

- id: ir_power_on
  label: "IR Power On"
  kind: action
  command: "04 FB 71 8E"

- id: ir_power_off
  label: "IR Power Off"
  kind: action
  command: "04 FB 72 8D"

- id: ir_input_toggle
  label: "IR Input Toggle"
  kind: action
  command: "04 FB 73 8C"

- id: ir_tv_tuner
  label: "IR TV Tuner"
  kind: action
  command: "04 FB 74 8B"

- id: ir_hdmi1
  label: "IR HDMI 1"
  kind: action
  command: "04 FB 7C 83"

- id: ir_hdmi2
  label: "IR HDMI 2"
  kind: action
  command: "04 FB 7D 82"

- id: ir_hdmi3
  label: "IR HDMI 3"
  kind: action
  command: "04 FB 7E 81"

- id: ir_hdmi4
  label: "IR HDMI 4"
  kind: action
  command: "04 FB 7F 80"

- id: ir_hdmi5
  label: "IR HDMI 5"
  kind: action
  command: "04 FB 80 7F"

- id: ir_vga
  label: "IR VGA"
  kind: action
  command: "04 FB 81 7E"

- id: ir_usb
  label: "IR USB"
  kind: action
  command: "04 FB 82 7D"

- id: ir_picture_mode_toggle
  label: "IR Picture Mode Toggle"
  kind: action
  command: "04 FB 83 7C"

- id: ir_sound_mode_toggle
  label: "IR Sound Mode Toggle"
  kind: action
  command: "04 FB 84 7B"

- id: ir_aspect_wide_16_9
  label: "IR Aspect Wide 16:9"
  kind: action
  command: "04 FB 85 7A"

- id: ir_aspect_normal_4_3
  label: "IR Aspect Normal 4:3"
  kind: action
  command: "04 FB 86 79"

- id: ir_aspect_cinema
  label: "IR Aspect Cinema"
  kind: action
  command: "04 FB 87 78"

- id: ir_aspect_panorama
  label: "IR Aspect Panorama"
  kind: action
  command: "04 FB 88 77"

- id: ir_aspect_zoom
  label: "IR Aspect Zoom"
  kind: action
  command: "04 FB 89 76"

- id: ir_channel_list
  label: "IR Channel List"
  kind: action
  command: "04 FB 8A 75"

- id: ir_fav_channel
  label: "IR Favorite Channel"
  kind: action
  command: "04 FB 8B 74"

- id: ir_sleep
  label: "IR Sleep"
  kind: action
  command: "04 FB 8C 73"

- id: ir_tv_menu_toggle
  label: "IR TV Menu Toggle"
  kind: action
  command: "04 FB 8D 72"

- id: ir_home
  label: "IR Home"
  kind: action
  command: "04 FB 8E 71"

- id: ir_tools
  label: "IR Tools (Second Menu)"
  kind: action
  command: "04 FB 8F 70"

- id: ir_digit_0
  label: "IR Digit 0"
  kind: action
  command: "04 FB 90 6F"

- id: ir_digit_1
  label: "IR Digit 1"
  kind: action
  command: "04 FB 91 6E"

- id: ir_digit_2
  label: "IR Digit 2"
  kind: action
  command: "04 FB 92 6D"

- id: ir_digit_3
  label: "IR Digit 3"
  kind: action
  command: "04 FB 93 6C"

- id: ir_digit_4
  label: "IR Digit 4"
  kind: action
  command: "04 FB 94 6B"

- id: ir_digit_5
  label: "IR Digit 5"
  kind: action
  command: "04 FB 95 6A"

- id: ir_digit_6
  label: "IR Digit 6"
  kind: action
  command: "04 FB 96 69"

- id: ir_digit_7
  label: "IR Digit 7"
  kind: action
  command: "04 FB 97 68"

- id: ir_digit_8
  label: "IR Digit 8"
  kind: action
  command: "04 FB 98 67"

- id: ir_digit_9
  label: "IR Digit 9"
  kind: action
  command: "04 FB 99 66"

- id: ir_digit_dash
  label: "IR Digit Dash (-)"
  kind: action
  command: "04 FB 9A 65"

- id: ir_previous_channel
  label: "IR Previous Channel"
  kind: action
  command: "04 FB 9B 64"

- id: ir_up
  label: "IR Up Arrow"
  kind: action
  command: "04 FB 9C 63"

- id: ir_down
  label: "IR Down Arrow"
  kind: action
  command: "04 FB 9D 62"

- id: ir_left
  label: "IR Left Arrow"
  kind: action
  command: "04 FB 9E 61"

- id: ir_right
  label: "IR Right Arrow"
  kind: action
  command: "04 FB 9F 60"

- id: ir_enter
  label: "IR Enter"
  kind: action
  command: "04 FB A0 5F"

- id: ir_select_ok
  label: "IR Select (OK)"
  kind: action
  command: "04 FB A1 5E"

- id: ir_return
  label: "IR Return"
  kind: action
  command: "04 FB A2 5D"

- id: ir_exit
  label: "IR Exit"
  kind: action
  command: "04 FB A3 5C"

- id: ir_info_display_toggle
  label: "IR Info/Display Toggle"
  kind: action
  command: "04 FB A4 5B"

- id: ir_volume_down
  label: "IR Volume Down"
  kind: action
  command: "04 FB A5 5A"

- id: ir_volume_up
  label: "IR Volume Up"
  kind: action
  command: "04 FB A6 59"

- id: ir_channel_down
  label: "IR Channel Down"
  kind: action
  command: "04 FB A7 58"

- id: ir_channel_up
  label: "IR Channel Up"
  kind: action
  command: "04 FB A8 57"

- id: ir_pip_toggle
  label: "IR PIP Toggle"
  kind: action
  command: "04 FB A9 56"

- id: ir_pip_input
  label: "IR PIP Input"
  kind: action
  command: "04 FB AA 55"

- id: ir_pip_swap
  label: "IR PIP Swap"
  kind: action
  command: "04 FB AB 54"

- id: ir_pip_position
  label: "IR PIP Position"
  kind: action
  command: "04 FB AC 53"

- id: ir_pip_size
  label: "IR PIP Size"
  kind: action
  command: "04 FB AD 52"

- id: ir_guide_toggle
  label: "IR Guide Toggle"
  kind: action
  command: "04 FB AE 51"

- id: ir_freeze_toggle
  label: "IR Freeze Toggle"
  kind: action
  command: "04 FB AF 50"
```

## Feedbacks
```yaml
- id: ack
  type: enum
  values: [OKAY, EROR, WAIT]
  description: "Acknowledgement token in the response frame, following the colon delimiter (e.g. `5FA:OKAY####[cs][CR]`)."

- id: power_on_command_state
  type: enum
  values: [0, 1]
  description: "Response to PWRE???? (0=disabled, 1=enabled)."

- id: current_input
  type: enum
  values: ["1", "3", "4", "6", "9", "10", "11", "12"]
  description: "Response to INPT????. 1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4."

- id: current_picture_mode
  type: enum
  values: ["0", "2", "3", "4", "5", "6"]
  description: "Response to PMOD????. 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport."

- id: current_aspect_ratio
  type: enum
  values: ["0", "2", "3", "4", "5", "6", "7", "8"]
  description: "Response to ASPT????. 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1, 7=Panoramic, 8=Cinema."

- id: current_color_temp
  type: enum
  values: ["0", "2", "3", "4"]
  description: "Response to CTEM????. 0=High, 2=Middle, 3=Mid-Low, 4=Low."

- id: current_sound_mode
  type: enum
  values: ["0", "2", "3", "4", "5"]
  description: "Response to AMOD????. 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night."

- id: mute_state
  type: enum
  values: [0, 1]
  description: "Response to MUTE????. 0=not muted, 1=muted."

- id: current_volume
  type: integer
  range: [0, 100]
  description: "Response to VOLM????, BRIT????, CONT????, COLR????, TINT????. Each 0000-0100 maps to 0-100."

- id: current_sharpness
  type: integer
  range: [0, 20]
  description: "Response to SHRP????. Range 0-20."

- id: overscan_state
  type: enum
  values: [0, 2]
  description: "Response to OVSN????. 0=On, 2=Off."

- id: tv_speaker_state
  type: enum
  values: [0, 2]
  description: "Response to ASPK????. 0=Off, 2=On. SPKM supports [ARC] per revision V3.1."

- id: tuner_mode
  type: enum
  values: [0, 2]
  description: "Response to TUNR????. 0=Antenna, 2=Cable."

- id: caption_state
  type: enum
  values: [0, 2, 3]
  description: "Response to CC##????. 0=off, 2=on, 3=on when mute."

- id: current_language
  type: enum
  values: [0, 2, 3]
  description: "Response to LANG????. 0=English, 2=Español, 3=Français."

- id: standby_led_state
  type: enum
  values: [0, 2]
  description: "Response to PLED????. 0=Off, 2=On."

- id: power_off_control_mode
  type: enum
  values: [0, 1]
  description: "Response to PBTN????. 0=AC ONLY, 1=ALL."

- id: volume_control_mode
  type: enum
  values: [0, 1, 2, 3]
  description: "Response to SVOL????. 0=LOCKED, 1=LAST VOLUME, 2=AC RESET, 3=STANDBY RESET."

- id: remote_key_state
  type: enum
  values: [0, 1, 2]
  description: "Response to RMOT????. 0=ENABLE, 1=DISABLE, 2=PARTIAL."

- id: panel_key_state
  type: enum
  values: [0, 1]
  description: "Response to PANL????. 0=ENABLE, 1=DISABLE."

- id: menu_access_state
  type: enum
  values: [0, 1]
  description: "Response to MENU????. 0=ENABLE, 1=DISABLE."

- id: av_menu_state
  type: enum
  values: [0, 1]
  description: "Response to AVMN????. 0=DISABLE, 1=ENABLE."

- id: osd_mode_state
  type: enum
  values: [0, 1]
  description: "Response to OSD#????. 0=ENABLE, 1=DISABLE."

- id: input_mode_state
  type: enum
  values: [0, 1, 2, 3]
  description: "Response to INPM????. 0=LOCKED, 1=SELECTABLE, 2=AC RESET, 3=STANDBY RESET."
```

## Variables
```yaml
- id: brightness
  type: integer
  range: [0, 100]
  description: "Set/query via BRIT. Persists on TV; default restored by RSTP1000."

- id: contrast
  type: integer
  range: [0, 100]
  description: "Set/query via CONT. Persists on TV; default restored by RSTP1000."

- id: color_saturation
  type: integer
  range: [0, 100]
  description: "Set/query via COLR. Persists on TV; default restored by RSTP1000."

- id: tint
  type: integer
  range: [0, 100]
  description: "Set/query via TINT. Persists on TV; default restored by RSTP1000."

- id: sharpness
  type: integer
  range: [0, 20]
  description: "Set/query via SHRP. Persists on TV; default restored by RSTP1000."

- id: backlight
  type: integer
  range: [0, 100]
  description: "Set/query via BKLV. Persists on TV."

- id: volume
  type: integer
  range: [0, 100]
  description: "Set/query via VOLM. Subject to volume range (MAVL) and lock (SVOL/VLFL)."

- id: volume_range_max
  type: integer
  range: [0, 100]
  description: "Set/query via MAVL. Caps the effective volume scale."

- id: volume_locked_level
  type: integer
  range: [0, 100]
  description: "Set/query via VLFL. Active when SVOL is LOCKED."
```

## Events
```yaml
# UNRESOLVED: source does not describe any unsolicited asynchronous
# notifications from the device; only polled Set/Query responses are defined.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro sequences;
# the closest equivalent is the BTTN command which simulates one
# remote-control button press per invocation.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe explicit safety warnings, interlock
# procedures, or power-on sequencing requirements beyond the TV-side
# Custom Install menu gating noted in the Transport section.
```

## Notes

- **Protocol revisions:** Document revision V3.6 (17-Apr-2017) is the latest. Earlier revisions added: V2.0 Component Configuration File (CCF) codes; V3.0 initial RS-232; V3.1 added `[ARC]` to SPKM, renamed PANL; V3.2 added MAC-specific commands; V3.3 error checking; V3.4/V3.5 series renames; V3.6 model offering and IR corrections.
- **Setup prerequisite:** Custom Install menu must be enabled (Quick Settings → `7 3 1 0` → Custom Installation → Enable) before any RS-232 command is accepted. For wake-from-standby via RS-232, Power On Command must also be enabled.
- **Protocol is case sensitive.** Operation direction byte is uppercase `S`/`Q`; the colon `0x3A` and CR `0x0D` are literal.
- **Checksum algorithm:** 8-bit sum of all bytes from the operation byte through the CHECKSUM byte, such that the total equals `0x00`. The CHECKSUM itself is appended as a single ASCII character.
- **Multiple-TV addressing:** `ALL` as CLIENT_ID broadcasts to every TV on the bus. For per-TV control, use the last 3 bytes of the target TV's Ethernet MAC (visible via Menu → Network → Network Information).
- **Connector:** Female DB9 on the TV. For PC/USB hosts use a USB-to-Serial adapter (sold separately).
- **`PWRE????` query limitation:** Per revision V3.1, the query for the Power-On-Command setting is not available in STANDBY mode.
- **BTTN button code reference (partial list; see source for full set):**
  - `1000`-`1009` = digit 0-9
  - `1010` = `-` (dash)
  - `1012` = POWER, `1015` = FRW `<<`, `1016` = PLAY, `1017` = FFW `>>`, `1018` = PAUSE, `1019` = PREVIOUS `<<`, `1020` = STOP, `1021` = NEXT `>>`
  - `1023` = Media Player (HiMedia), `1024` = SLEEP, `1027` = CC
  - `1031` = MUTE, `1032` = VOL-, `1033` = VOL+, `1034` = CH+, `1035` = CH-, `1036` = INPUT
  - `1038` = MENU, `1039` = Connected Home (HiSmart), `1040` = OK/ENTER
  - `1041` = UP, `1042` = DOWN, `1043` = LEFT, `1044` = RIGHT, `1045` = BACK, `1046` = EXIT
  - `1050` = Red, `1051` = Green, `1052` = Blue, `1053` = Yellow
  - `1054` = MTS/SAP, `1055` = Live TV
- **IR protocol:** NEC-format 38 kHz carrier; full Pronto CCF hex for each code is in the source. The COMPLETE HEX CODE column (`04 FB XX YY`) is sufficient to drive any NEC-style IR blaster. The 3rd byte is the data code and the 4th byte is its bitwise complement.
- **POIS truncation:** The Power-On Input Selection (POIS) parameter set was cut off mid-row in the source. Values 0000-0003 (LAST, Air, AV, Component) are confirmed; values for HDMI/VGA may exist and are not enumerated here.
- **SPKM / ARC note:** Revision V3.1 added `[ARC]` support to the `SPKM` query. `SPKM` itself is not documented in the visible portion of the source; treat as UNRESOLVED.

<!-- UNRESOLVED: no IP / network control protocol (TCP port, HTTP base URL, REST endpoints, OSC, UDP) is described anywhere in the source — the only machine control surface is RS-232 plus discrete IR. The presence of a MAC address implies Ethernet, but the protocol on top of Ethernet is not documented. -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-01T20:34:35.932Z
last_checked_at: 2026-05-14T18:17:16.007Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.007Z
matched_actions: 39
action_count: 44
confidence: medium
summary: "All spec actions matched literally in source; transport verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "protocol revision V3.6 (17-Apr-2017) is the latest; specific firmware mapping per sub-model is not stated in source."
- "no auth/login/password procedure described in source."
- "TCP/IP port, HTTP base URL, OSC endpoint — not documented in source; no IP control protocol is described even though the TV has a MAC address."
- "source does not describe any unsolicited asynchronous"
- "source does not document any multi-step macro sequences;"
- "source does not describe explicit safety warnings, interlock"
- "no IP / network control protocol (TCP port, HTTP base URL, REST endpoints, OSC, UDP) is described anywhere in the source — the only machine control surface is RS-232 plus discrete IR. The presence of a MAC address implies Ethernet, but the protocol on top of Ethernet is not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
