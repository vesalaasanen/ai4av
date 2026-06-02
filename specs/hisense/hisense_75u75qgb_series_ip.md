---
spec_id: admin/hisense-75u75qgb-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 75U75QGB Series Control Spec"
manufacturer: HiSense
model_family: "HiSense 75U75QGB Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "HiSense 75U75QGB Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - https://www.hisense-b2b.com
retrieved_at: 2026-05-04T21:41:00.893Z
last_checked_at: 2026-06-02T03:24:38.343Z
generated_at: 2026-06-02T03:24:38.343Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SPKM
  - B2BM
  - USBM
  - PSHF
  - "source does not explicitly name the 75U75QGB; the model is being associated with this Prosumer TV protocol doc on operator-supplied evidence. The doc explicitly states \"Check User Manual for your specific TV to identify supported IR commands by model.\""
  - "remove this section if not applicable"
  - "source does not document unsolicited notifications from the TV."
  - "source does not document multi-step sequences. The closest analog"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "75U75QGB-specific model applicability — the source doc is the generic Prosumer TV protocol manual; no statement in the source confirms or denies that the 75U75QGB implements this exact command set. Operator should validate against the device User Manual or a live device."
  - "TCP/IP control — user metadata claims TCP/IP as a known protocol, but the source contains no port number, no HTTP path, no JSON-RPC method, and no other TCP/IP evidence beyond the Ethernet MAC address being used as a client identifier. A separate network control protocol (if it exists for 75U75QGB) would need a different source document."
  - "firmware version compatibility — source revision is V3.6 (2017); the 75U75QGB is a 2025-era product. No statement in the source or in the operator-supplied metadata confirms whether the 75U75QGB firmware implements this exact command set, a superset, or a subset. The 75U75QGB may use a different (Roku TV / Google TV / VIDAA) control path entirely."
verification:
  verdict: verified
  checked_at: 2026-06-02T03:24:38.343Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 68 spec actions matched to source commands with correct opcodes and shapes; 4 source commands (SPKM, B2BM, USBM, PSHF) not in spec but ratio 38/42=0.905 is above 0.9 floor and extra count ≤5. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense 75U75QGB Series Control Spec

## Summary

RS-232 and IR control protocol for the HiSense Prosumer TV line, as documented in the vendor "RS-232/IR Protocol for Hisense® Prosumer TV" manual (rev V3.6, 17-Apr-2017). The 75U75QGB Series is not explicitly named in the source — the document is generic across the "Prosumer TV" product line and instructs the integrator to consult the device User Manual for model-specific support. Transport is RS-232 (DB9 D-sub female) at 9600 8N1, ASCII command/ack protocol, with a 3-byte client ID derived from the TV's Ethernet MAC address (last 3 hex bytes) or a broadcast `ALL` token.

<!-- UNRESOLVED: source does not explicitly name the 75U75QGB; the model is being associated with this Prosumer TV protocol doc on operator-supplied evidence. The doc explicitly states "Check User Manual for your specific TV to identify supported IR commands by model." -->

<!-- UNRSOLVED: source contains no port number for any IP/network control. User notes "Known protocol: TCP/IP" but the source only documents RS-232 (DB9) plus an Ethernet MAC address derivation for the client ID field. Treat TCP/IP as unverified. -->

## Transport
```yaml
# Source documents RS-232 only. No TCP/UDP/HTTP/port number present.
# IR section is documented but the spec format targets machine protocols;
# IR codes (Pronto CCF / NEC data) are listed in the source as a separate
# catalogue and are NOT serialized as AI4AV Actions.
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # Source: "Communication Code: ASCII code"
auth:
  type: none  # inferred: no login/password procedure in source
```

## Traits
```yaml
- powerable       # POWR, PWRE documented
- routable        # INPT documented (TV/AV/Component/HDMI1-4/VGA)
- queryable       # ??/???? query form on every command
- levelable       # VOLM, BRIT, CONT, COLR, TINT, SHRP, BKLV documented
```

## Actions
```yaml
# Source protocol frame (fixed length, 14 bytes + CR):
#   S/Q + 3-byte CLIENT_ID + 4-byte COMMAND + 4-byte DATA + 1-byte CHECKSUM + 0x0D
# "S" = Set, "Q" = Query. Checksum = 8-bit sum so the total frame (incl. CHECKSUM byte) = 0x00.
# Below, "command" uses ASCII form with placeholder; "checksum" / hex form are
# documented in the source per-row but are command-specific - the source does
# NOT expose a single formula. Implementers must compute the checksum per the
# rule above and consult the source's per-row hex columns.
#
# Generic (broadcast) variant: client_id = "ALL" - hex `41 4C 4C`.
# TV-specific variant: client_id = last 3 hex bytes of TV's Ethernet MAC.

- id: pwre_set
  label: Set RS-232 Remote Power On
  kind: action
  command: "{OP}{CID}PWRE{ENABLE}{CSUM}{CR}"
  params:
    - name: OP
      type: string
      description: Operation direction - use "S" for set
    - name: CID
      type: string
      description: 3-byte client ID ("ALL" for broadcast, or last 3 hex bytes of TV MAC)
    - name: ENABLE
      type: string
      description: "0000 = disable RS-232 remote power on, 0001 = enable"
    - name: CSUM
      type: string
      description: 8-bit checksum such that the entire 14-byte frame (incl. CHECKSUM byte) sums to 0x00
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: pwre_query
  label: Query RS-232 Remote Power On Setting
  kind: query
  command: "Q{CID}PWRE????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: powr_set
  label: Set Power On/Off
  kind: action
  command: "S{CID}POWR{STATE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: STATE
      type: string
      description: "0000 = standby, 0001 = power on"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: inpt_set
  label: Set Input Source
  kind: action
  command: "S{CID}INPT{SRC}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: SRC
      type: string
      description: "0000 = next input, 0001 = TV, 0003 = Component, 0004 = AV, 0006 = VGA, 0009 = HDMI1, 0010 = HDMI2, 0011 = HDMI3, 0012 = HDMI4"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: inpt_query
  label: Query Current Input Source
  kind: query
  command: "Q{CID}INPT????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: pmod_set
  label: Set Picture Mode
  kind: action
  command: "S{CID}PMOD{MODE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: MODE
      type: string
      description: "0000 = Standard, 0002 = Vivid, 0003 = EnergySaving, 0004 = Theater, 0005 = Game, 0006 = Sport"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: pmod_query
  label: Query Picture Mode
  kind: query
  command: "Q{CID}PMOD????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: brit_set
  label: Set Brightness
  kind: action
  command: "S{CID}BRIT{VAL}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: VAL
      type: string
      description: "0000-0100 (4 ASCII hex digits, 0-256 dec)"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: brit_query
  label: Query Brightness
  kind: query
  command: "Q{CID}BRIT????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: cont_set
  label: Set Contrast
  kind: action
  command: "S{CID}CONT{VAL}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: VAL
      type: string
      description: "0000-0100"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: cont_query
  label: Query Contrast
  kind: query
  command: "Q{CID}CONT????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: colr_set
  label: Set Color Saturation
  kind: action
  command: "S{CID}COLR{VAL}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: VAL
      type: string
      description: "0000-0100"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: colr_query
  label: Query Color Saturation
  kind: query
  command: "Q{CID}COLR????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: tint_set
  label: Set Tint
  kind: action
  command: "S{CID}TINT{VAL}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: VAL
      type: string
      description: "0000-0100"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: tint_query
  label: Query Tint
  kind: query
  command: "Q{CID}TINT????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: shrp_set
  label: Set Sharpness
  kind: action
  command: "S{CID}SHRP{VAL}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: VAL
      type: string
      description: "0000-0020 (0-32 dec)"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: shrp_query
  label: Query Sharpness
  kind: query
  command: "Q{CID}SHRP????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: aspt_set
  label: Set Aspect Ratio
  kind: action
  command: "S{CID}ASPT{RATIO}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: RATIO
      type: string
      description: "0000 = Auto, 0002 = Normal, 0003 = Zoom, 0004 = Wide, 0005 = Direct, 0006 = 1-to-1 pixel map, 0007 = Panoramic, 0008 = Cinema"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: aspt_query
  label: Query Aspect Ratio
  kind: query
  command: "Q{CID}ASPT????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: ovsn_set
  label: Set Overscan
  kind: action
  command: "S{CID}OVSN{STATE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: STATE
      type: string
      description: "0000 = On, 0002 = Off"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: ovsn_query
  label: Query Overscan
  kind: query
  command: "Q{CID}OVSN????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: rstp_picture
  label: Reset Picture Settings
  kind: action
  command: "S{CID}RSTP1000{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: ctem_set
  label: Set Color Temperature
  kind: action
  command: "S{CID}CTEM{TEMP}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: TEMP
      type: string
      description: "0000 = High, 0002 = Middle, 0003 = Mid-Low, 0004 = Low"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: ctem_query
  label: Query Color Temperature
  kind: query
  command: "Q{CID}CTEM????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: bklv_set
  label: Set Backlight
  kind: action
  command: "S{CID}BKLV{VAL}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: VAL
      type: string
      description: "0000-0100 (0-100 dec)"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: bklv_query
  label: Query Backlight
  kind: query
  command: "Q{CID}BKLV????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: amod_set
  label: Set Sound Mode
  kind: action
  command: "S{CID}AMOD{MODE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: MODE
      type: string
      description: "0000 = Standard, 0002 = Theater, 0003 = Music, 0004 = Speech, 0005 = Late night"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: amod_query
  label: Query Sound Mode
  kind: query
  command: "Q{CID}AMOD????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: rsta_audio
  label: Reset Audio Settings
  kind: action
  command: "S{CID}RSTA2000{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: volm_set
  label: Set Volume
  kind: action
  command: "S{CID}VOLM{VAL}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: VAL
      type: string
      description: "0000-0100 (0-100 dec)"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: volm_query
  label: Query Volume
  kind: query
  command: "Q{CID}VOLM????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: mute_set
  label: Set Mute
  kind: action
  command: "S{CID}MUTE{STATE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: STATE
      type: string
      description: "0000 = mute off, 0001 = mute on"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: mute_query
  label: Query Mute Status
  kind: query
  command: "Q{CID}MUTE????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: aspk_set
  label: Set TV Speaker
  kind: action
  command: "S{CID}ASPK{STATE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: STATE
      type: string
      description: "0000 = Off, 0002 = On"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: aspk_query
  label: Query TV Speaker State
  kind: query
  command: "Q{CID}ASPK????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: tunr_set
  label: Set Tuner Mode
  kind: action
  command: "S{CID}TUNR{MODE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: MODE
      type: string
      description: "0000 = Antenna, 0002 = Cable"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: tunr_query
  label: Query Tuner Mode
  kind: query
  command: "Q{CID}TUNR????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: tscn_auto_search
  label: Automatic Channel Search
  kind: action
  command: "S{CID}TSCN0001{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: chan_set
  label: Channel Up/Down
  kind: action
  command: "S{CID}CHAN{DIR}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: DIR
      type: string
      description: "0000 = channel down, 0001 = channel up"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: cc_set
  label: Set Closed Caption
  kind: action
  command: "S{CID}CC##{STATE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: STATE
      type: string
      description: "0000 = CC off, 0002 = CC on, 0003 = CC on when mute"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: cc_query
  label: Query Closed Caption State
  kind: query
  command: "Q{CID}CC##????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: rset_factory
  label: Restore Factory Settings
  kind: action
  command: "S{CID}RSET9999{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: lang_set
  label: Set OSD Language
  kind: action
  command: "S{CID}LANG{LANG}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: LANG
      type: string
      description: "0000 = English, 0002 = Espanol, 0003 = Francais"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: lang_query
  label: Query OSD Language
  kind: query
  command: "Q{CID}LANG????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: pled_set
  label: Set Standby LED
  kind: action
  command: "S{CID}PLED{STATE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: STATE
      type: string
      description: "0000 = Off, 0002 = On"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: pled_query
  label: Query Standby LED
  kind: query
  command: "Q{CID}PLED????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: bttn_press
  label: Remote Control Button Simulator
  kind: action
  command: "S{CID}BTTN{CODE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CODE
      type: string
      description: 4-digit button code (1000-1099). Source enumerates: 1010 dash, 1012 power, 1015 frw, 1016 play, 1017 ffw, 1018 pause, 1019 prev, 1020 stop, 1021 next, 1023 HiMedia, 1024 sleep, 1027 CC, 1031 mute, 1032 vol-, 1033 vol+, 1034 ch+, 1035 ch-, 1036 input, 1038 menu, 1039 HiSmart, 1040 OK/enter, 1041 up, 1042 down, 1043 left, 1044 right, 1045 back, 1046 exit, 1050 red, 1051 green, 1052 blue, 1053 yellow, 1054 MTS/SAP, 1055 Live TV, 1000-1009 digits 0-9
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: pbtn_set
  label: Set Power Off Control Mode
  kind: action
  command: "S{CID}PBTN{MODE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: MODE
      type: string
      description: "0000 = AC only, 0001 = ALL"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: pbtn_query
  label: Query Power Off Control Mode
  kind: query
  command: "Q{CID}PBTN????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: mavl_set
  label: Set Maximum Volume Range
  kind: action
  command: "S{CID}MAVL{VAL}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: VAL
      type: string
      description: "0000-0100"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: mavl_query
  label: Query Maximum Volume Range
  kind: query
  command: "Q{CID}MAVL????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: svol_set
  label: Set Volume Control Behavior
  kind: action
  command: "S{CID}SVOL{MODE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: MODE
      type: string
      description: "0000 = locked, 0001 = last volume, 0002 = AC reset, 0003 = standby reset"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: svol_query
  label: Query Volume Control Behavior
  kind: query
  command: "Q{CID}SVOL????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: vlfl_set
  label: Set Volume Locked Level
  kind: action
  command: "S{CID}VLFL{VAL}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: VAL
      type: string
      description: "0000-0100"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: vlfl_query
  label: Query Volume Locked Level
  kind: query
  command: "Q{CID}VLFL????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: rmot_set
  label: Set Remote Key Lock
  kind: action
  command: "S{CID}RMOT{MODE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: MODE
      type: string
      description: "0000 = enable, 0001 = disable, 0002 = partial"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: rmot_query
  label: Query Remote Key Lock
  kind: query
  command: "Q{CID}RMOT????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: panl_set
  label: Set Panel Key Lock
  kind: action
  command: "S{CID}PANL{STATE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: STATE
      type: string
      description: "0000 = enable, 0001 = disable"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: panl_query
  label: Query Panel Key Lock
  kind: query
  command: "Q{CID}PANL????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: menu_set
  label: Set Menu Access
  kind: action
  command: "S{CID}MENU{STATE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: STATE
      type: string
      description: "0000 = enable, 0001 = disable"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: menu_query
  label: Query Menu Access
  kind: query
  command: "Q{CID}MENU????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: avmn_set
  label: Set AV Setting Menu
  kind: action
  command: "S{CID}AVMN{STATE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: STATE
      type: string
      description: "0000 = disable, 0001 = enable"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: avmn_query
  label: Query AV Setting Menu
  kind: query
  command: "Q{CID}AVMN????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: osd_set
  label: Set OSD Display Mode
  kind: action
  command: "S{CID}OSD#{STATE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: STATE
      type: string
      description: "0000 = enable, 0001 = disable"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: osd_query
  label: Query OSD Display Mode
  kind: query
  command: "Q{CID}OSD#????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: inpm_set
  label: Set Input Mode
  kind: action
  command: "S{CID}INPM{MODE}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: MODE
      type: string
      description: "0000 = locked, 0001 = selectable, 0002 = AC reset, 0003 = standby reset"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: inpm_query
  label: Query Input Mode
  kind: query
  command: "Q{CID}INPM????{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)

- id: pois_set
  label: Set Power On Input Source
  kind: action
  command: "S{CID}POIS{SRC}{CSUM}{CR}"
  params:
    - name: CID
      type: string
      description: 3-byte client ID
    - name: SRC
      type: string
      description: "0000 = last, 0001 = Air, 0002 = AV, 0003 = Component (additional values implied by source - see line 427 truncated)"
    - name: CSUM
      type: string
      description: 8-bit checksum
    - name: CR
      type: string
      description: Carriage return (0x0D)
```

## Feedbacks
```yaml
- id: input_source
  type: enum
  values: [TV, AV, Component, HDMI1, HDMI2, HDMI3, HDMI4, VGA]
- id: picture_mode
  type: enum
  values: [standard, vivid, energy_saving, theater, game, sport]
- id: aspect_ratio
  type: enum
  values: [auto, normal, zoom, wide, direct, one_to_one, panoramic, cinema]
- id: sound_mode
  type: enum
  values: [standard, theater, music, speech, late_night]
- id: mute_state
  type: enum
  values: [off, on]
- id: speaker_state
  type: enum
  values: [off, on]
- id: tuner_mode
  type: enum
  values: [antenna, cable]
- id: closed_caption
  type: enum
  values: [off, on, on_when_mute]
- id: language
  type: enum
  values: [english, spanish, french]
- id: standby_led
  type: enum
  values: [off, on]
- id: overscan
  type: enum
  values: [on, off]
- id: color_temp
  type: enum
  values: [high, middle, mid_low, low]
- id: power_on_command_enabled
  type: enum
  values: [disabled, enabled]
- id: power_state
  type: enum
  values: [standby, on]
- id: remote_key_lock
  type: enum
  values: [enable, disable, partial]
- id: panel_key_lock
  type: enum
  values: [enable, disable]
- id: menu_access
  type: enum
  values: [enable, disable]
- id: av_setting_menu
  type: enum
  values: [disable, enable]
- id: osd_mode
  type: enum
  values: [enable, disable]
- id: input_mode_lock
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]
- id: power_off_control_mode
  type: enum
  values: [ac_only, all]
- id: volume_control_behavior
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]
- id: brightness
  type: integer
  range: [0, 100]
- id: contrast
  type: integer
  range: [0, 100]
- id: color_saturation
  type: integer
  range: [0, 100]
- id: tint
  type: integer
  range: [0, 100]
- id: sharpness
  type: integer
  range: [0, 20]
- id: backlight
  type: integer
  range: [0, 100]
- id: volume
  type: integer
  range: [0, 100]
- id: max_volume
  type: integer
  range: [0, 100]
- id: volume_locked_level
  type: integer
  range: [0, 100]
```

## Variables
```yaml
# No settable scalar parameters distinct from the action set above. All settable
# values are exposed as parameterized actions in the Actions section.
# UNRESOLVED: remove this section if not applicable
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from the TV.
# The protocol is strictly command/response - controller sends a frame, TV sends
# one ACK back. There is no asynchronous event stream.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences. The closest analog
# is the TV Setup procedure (enable Custom Installation menu, set RS-232 port
# active, optionally enable Power On Command for wake-from-standby), but that
# is installer setup, not a device-driven macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or hazardous-state definitions. RSET9999 (factory reset) and POWR0000 (standby)
# are reversible; no parameter-set combination in the source is flagged as
# destructive or operator-confirmation-required.
```

## Notes

- The source document is the generic "RS-232/IR Protocol for Hisense® Prosumer TV" (rev V3.6, 17-Apr-2017), not a 75U75QGB-specific manual. The doc itself states "Check User Manual for your specific TV to identify supported IR commands by model." This spec therefore represents the protocol as documented for the Prosumer TV product line; model applicability to the 75U75QGB is operator-assumed and not directly confirmed by the source.
- User-supplied metadata tagged "Known protocol: TCP/IP" — the source does not document any TCP/IP port, HTTP endpoint, or REST path. Only RS-232 (DB9 D-sub female, 9600 8N1 ASCII) is documented. The Ethernet MAC address derivation for the 3-byte client ID is the only networking-related evidence and is not sufficient to infer a transport. IP-based control is not serialized in this spec.
- IR section in the source documents ~50 discrete NEC-format codes (POWER, HDMI.1-5, VOL±, CH±, digit 0-9, navigation, etc.) plus their full Pronto CCF hex strings. These are out of scope for AI4AV Actions (IR is a separate transport, not a machine protocol) and are not serialized.
- Protocol frame: 14 bytes + CR(0x0D). Layout: `OP(1) + CID(3) + COMMAND(4) + DATA(4) + CHECKSUM(1)`. CHECKSUM is the 8-bit sum such that the entire 14-byte frame including the CHECKSUM byte equals 0x00. The source does not give a closed-form expression — implementers must compute the checksum per row, or recompute from the per-command hex columns the source lists.
- Acknowledgement (ACK) format from TV: `{CID(3)} : ACK(A-Z) {DATA(4)} {CHECKSUM(1)} CR`. Common ACKs: `OKAY` (success), `EROR` (error), `WAIT` (busy). For example, the TV returns `5FA:OKAYHDM1[0xCB][0x0D]` when the input query for client `5FA` resolves to HDMI1.
- Per-row hex in the source distinguishes "TV-specific" (last 3 hex bytes of MAC = `465` shown) from "Generic" (`ALL` = `41 4C 4C` shown) command forms — same command/data, different CID. Implementations targeting a single known TV should use the MAC-derived CID; broadcast scenarios use `ALL`.
- The protocol is case-sensitive (per source note).
- The source notes that the TV must have Custom Installation set to "Enable" in the on-screen menu (and "Power On Command" set to "Enable" if RS-232 wake-from-standby is required) before the RS-232 port becomes active.

<!-- UNRESOLVED: 75U75QGB-specific model applicability — the source doc is the generic Prosumer TV protocol manual; no statement in the source confirms or denies that the 75U75QGB implements this exact command set. Operator should validate against the device User Manual or a live device. -->

<!-- UNRESOLVED: TCP/IP control — user metadata claims TCP/IP as a known protocol, but the source contains no port number, no HTTP path, no JSON-RPC method, and no other TCP/IP evidence beyond the Ethernet MAC address being used as a client identifier. A separate network control protocol (if it exists for 75U75QGB) would need a different source document. -->

<!-- UNRESOLVED: firmware version compatibility — source revision is V3.6 (2017); the 75U75QGB is a 2025-era product. No statement in the source or in the operator-supplied metadata confirms whether the 75U75QGB firmware implements this exact command set, a superset, or a subset. The 75U75QGB may use a different (Roku TV / Google TV / VIDAA) control path entirely. -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - https://www.hisense-b2b.com
retrieved_at: 2026-05-04T21:41:00.893Z
last_checked_at: 2026-06-02T03:24:38.343Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T03:24:38.343Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 68 spec actions matched to source commands with correct opcodes and shapes; 4 source commands (SPKM, B2BM, USBM, PSHF) not in spec but ratio 38/42=0.905 is above 0.9 floor and extra count ≤5. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- SPKM
- B2BM
- USBM
- PSHF
- "source does not explicitly name the 75U75QGB; the model is being associated with this Prosumer TV protocol doc on operator-supplied evidence. The doc explicitly states \"Check User Manual for your specific TV to identify supported IR commands by model.\""
- "remove this section if not applicable"
- "source does not document unsolicited notifications from the TV."
- "source does not document multi-step sequences. The closest analog"
- "source contains no explicit safety warnings, interlock procedures,"
- "75U75QGB-specific model applicability — the source doc is the generic Prosumer TV protocol manual; no statement in the source confirms or denies that the 75U75QGB implements this exact command set. Operator should validate against the device User Manual or a live device."
- "TCP/IP control — user metadata claims TCP/IP as a known protocol, but the source contains no port number, no HTTP path, no JSON-RPC method, and no other TCP/IP evidence beyond the Ethernet MAC address being used as a client identifier. A separate network control protocol (if it exists for 75U75QGB) would need a different source document."
- "firmware version compatibility — source revision is V3.6 (2017); the 75U75QGB is a 2025-era product. No statement in the source or in the operator-supplied metadata confirms whether the 75U75QGB firmware implements this exact command set, a superset, or a subset. The 75U75QGB may use a different (Roku TV / Google TV / VIDAA) control path entirely."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
